const User = require("../Models/User");
const shoppingCart = require("../Models/shoppingCart");
const auth = require("../Controllers/auth");

async function getUser(req, res) {
  const email = req.params.User;
  const user = await User.findOne({ email: email });
  if (!user)
    return res
      .status(200)
      .send({ message: "El usuario no existe", status: "error" });
  return res.status(200).send({ user });
}

function getAll(req, res) {
  User.find({}, (error, users) => {
    if (error) {
      return res.status(400).send({ msj: "No existen usuarios" });
    } else {
      res.status(200).send(users);
    }
  });
}

async function removeUser(req, res) {
  const user = req.params.email;
  try {
    // Buscar y eliminar el usuario por su ID
    const removedUser = await User.findOneAndRemove({ email : user });
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
  User.deleteMany({}, (error) => {
    if (error) {
      return res.status(400).send({ msj: "Error al remover usuarios" });
    } else {
      res.status(200).send({ msj: "Se eliminaron todos los usuarios" });
    }
  });
}

async function updateUser(req, res) {
  const { id } = req.params;
  const { name, lastname, email, address } = req.body;
  const findUser = await User.find({email: req.body.email});
  console.log(findUser);
  if(findUser.length > 0) return res.status(200).send({
    msj: "El email ya está asociado a un usuario",
    status: "warning",
  });
  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        name,
        lastname,
        email,
        address,
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error al actualizar el usuario:", error);
    res.status(500).json({ error: "Error al actualizar el usuario" });
  }
}

module.exports = {
  getUser,
  getAll,
  removeAll,
  updateUser,
  removeUser
};
