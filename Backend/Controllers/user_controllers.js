const User = require("../Models/User");
const shoppingCart = require("../Models/shoppingCart");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "mundotenisCGA_SECRETKEY";
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;
const auth = require("../Controllers/auth");
const emailController = require('../Controllers/email_controllers');

async function getUser(req, res) {
  const id = req.params.id;
  const user = await User.findOne({ _id: id }).select("-pass");
  if (!user) return res.status(404).send({ message: "El usuario no existe", status: "error" });
  return res.status(200).send({ user: user, status: "success" });
}

function getAll(req, res) {
  User.find({},  "-pass", (error, users) => {
    if (error) {
      return res.status(400).send({ message: "No existen usuarios", status: "error" });
    } else {
      res.status(200).send({users: users, status: "success"});
    }
  });
}

async function removeUser(req, res) {
  const id = req.params.id;
  try {
    // Buscar y eliminar el usuario por su ID
    const user = await User.findById(id);
    const removedUser = await User.findOneAndRemove({ _id : id });

    const removedCartUser = await shoppingCart.findOneAndRemove({ User: user });
    if (!removedUser) {
      return res.status(404).send({ message: "Usuario no encontrado" , status: "error"});
    }

    return res.status(200).send({ message: "Usuario eliminado exitosamente" , status: "success"});
  } catch (error) {
    console.error("Error al eliminar el usuario:", error);
    return res.status(500).json({ message: "Error al eliminar el usuario" , status: "error"});
  }
}

function removeAll(req, res) {
  try{
    User.deleteMany({}, (error) => {
      if (error) {
        throw new Error("Error al eliminar usuarios");
      }
    });
    shoppingCart.deleteMany({}, (error) => {
      if (error) {
        throw new Error("Error al eliminar los carros asociados a los usuarios")
      }
    });
  }catch (error) {
    return res.status(400).send({message: "Error al remover usuarios", status: "error"})
  }
}

async function updateUser(req, res) {
  const { id } = req.params;
  const { name, lastName, email, address, region, comuna, cellNumber, currentPassword, newPassword } = req.body;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" , status: "error"});
    }
    let hashedPassword = null;
    if (currentPassword && newPassword) {
      const passwordsMatch = await comparePasswords(currentPassword, user.pass);
      if (!passwordsMatch) {
        return res.status(400).json({ message: "La contraseña actual no es correcta" , status: "error"});
      }
      const salt = await bcrypt.genSalt(SALT_ROUNDS);
      hashedPassword = await bcrypt.hash(newPassword, salt);
    }

    const findUser = await User.findOne({ email: email });
    if (findUser && findUser._id.toString() !== id) {
      return res.status(400).json({ message: "El email ya está asociado a otro usuario" , status: "error"});
    }

    const updatedUser = await User.findByIdAndUpdate(id,
      {
        name,
        lastName,
        email,
        address,
        region,
        comuna,
        cellNumber,
        ...(hashedPassword && { pass: hashedPassword }) // Actualizar la contraseña solo si se proporcionó una nueva
      },
      { new: true }
    ).select("-pass");

    res.clearCookie("accessToken");
    const accessToken = jwt.sign({ userId: findUser.id, ...updatedUser }, SECRET_KEY);

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
    });
    res.status(200).send({"updateUser":updatedUser, "newToken": accessToken, status: "succes"});
  } catch (error) {
    console.error("Error al actualizar el usuario:", error);
    res.status(500).send({ message: "Error al actualizar el usuario", status: "error" });
  }
}

async function comparePasswords(plainPassword, hashedPassword) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(plainPassword, hashedPassword, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}

async function resetPasswordMail(req, res){
  try{
    const email = req.body.email
    const user = await User.findOne({email : email});
    if(!user) return res.status(404).send({message: "El correo no tiene cuenta", status: "error"});
    const name = user.name + " " + user.lastName;
    const token = jwt.sign({ email }, auth.SECRET_KEY, { expiresIn: '1h' });
    const resetPasswordLink = `https://localhost:5173/reset-password?token=${token}`;
    await emailController.sendResetPassword(name, email, resetPasswordLink);

    return res.status(200).send({message:'Se ha enviado un correo de restablecimiento de contraseña.', status: "success"});
  }catch(error){
    return res.status(500).send({ message: 'Ocurrió un error al procesar la solicitud de restablecimiento de contraseña.', status: "error"});
  }
}

async function resetPassword(req, res){
  const { token } = req.query;
  try{
    const pass = req.body.pass;
    const decoded = jwt.verify(token, auth.SECRET_KEY);
    const email = decoded.email;
    const user = await User.findOne({ email: email });
    if (!user) return res.status(404).send({ message: 'Usuario no encontrado', status: 'error' });

    const salt = await bcrypt.genSalt(auth.SALT_ROUNDS);
    const hash = await bcrypt.hash(pass, salt);
    user.pass = hash;
    await user.save();

    return res.status(200).send({message:"La contraseña se actualizó con éxito", status: "success"})
  }catch(error){
    return res.status(400).send({message: "Error al resetear la contraseña", status: "error"});
  }
}

async function validateEmail(req, res) {
  const { token } = req.query;
  try {
    const decoded = jwt.verify(token, auth.SECRET_KEY);
    const email = decoded.email;
    const user = await User.findOne({ email: email });
    if (!user) return res.status(404).send({ message: 'Usuario no encontrado', status: 'error' });

    user.active = true;
    await user.save();

    return res.status(200).send({ message: 'Cuenta activada exitosamente', status: 'success' });
  } catch (error) {
    if (error.name === 'TokenExpiredError') return res.status(400).send({ message: 'El enlace de confirmación ha expirado', status: 'error' });
    return res.status(400).send({ message: 'Token inválido', status: 'error' });
  }
}


module.exports = {
  getUser,
  getAll,
  removeAll,
  updateUser,
  removeUser,
  resetPassword,
  resetPasswordMail,
  validateEmail
};
