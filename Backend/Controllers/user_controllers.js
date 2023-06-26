const User = require("../Models/User");
const shoppingCart = require("../Models/shoppingCart");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "mundotenisCGA_SECRETKEY";
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;

async function getUser(req, res) {
  const id = req.params.id;
  const user = await User.findOne({ _id: id }).select("-pass");
  if (!user)
    return res.status(404).send({ message: "El usuario no existe", status: "error" });
  return res.status(200).send({ user });
}

function getAll(req, res) {
  User.find({},  "-pass", (error, users) => {
    if (error) {
      return res.status(400).send({ msj: "No existen usuarios" });
    } else {
      res.status(200).send(users);
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
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    return res.status(200).json({ message: "Usuario eliminado exitosamente" });
  } catch (error) {
    console.error("Error al eliminar el usuario:", error);
    return res.status(500).json({ message: "Error al eliminar el usuario" });
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
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    let hashedPassword = null;
    if (currentPassword && newPassword) {
      const passwordsMatch = await comparePasswords(currentPassword, user.pass);
      if (!passwordsMatch) {
        return res.status(400).json({ message: "La contraseña actual no es correcta" });
      }
      const salt = await bcrypt.genSalt(SALT_ROUNDS);
      hashedPassword = await bcrypt.hash(newPassword, salt);
    }

    const findUser = await User.findOne({ email: email });
    if (findUser && findUser._id.toString() !== id) {
      return res.status(400).json({ message: "El email ya está asociado a otro usuario" });
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
    res.status(200).json({"updateUser":updatedUser, "newToken": accessToken});
  } catch (error) {
    console.error("Error al actualizar el usuario:", error);
    res.status(500).json({ error: "Error al actualizar el usuario" });
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

module.exports = {
  getUser,
  getAll,
  removeAll,
  updateUser,
  removeUser
};
