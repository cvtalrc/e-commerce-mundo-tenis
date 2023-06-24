const User = require("../Models/User");
const shoppingCart = require("../Models/shoppingCart");

async function getUser(req, res) {
  const id = req.params.id;
  const user = await User.findOne({ _id: id }).select("-pass");
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
  const id = req.params.id;
  try {
    // Buscar y eliminar el usuario por su ID
    const user = await User.findOne({ _id: id });
    const email = user.email;
    const removedUser = await User.findOneAndRemove({ _id : id });

    const removedCartUser = await shoppingCart.findOneAndRemove({ User: email });
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
  const { name, lastname, email, address, region, commune, cellNumber } = req.body;

  try {
    const user = await User.find({_id : id});
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const findUser = await User.find({email: req.body.email});
    console.log(findUser);
    if(findUser.length > 0) return res.status(200).send({
      msj: "El email ya está asociado a un usuario",
      status: "warning",
    });

    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        name,
        lastname,
        email,
        address,
        region,
        commune,
        cellNumber
      },
      { new: true }
    );

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
