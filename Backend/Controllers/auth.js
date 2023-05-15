const User = require("../Models/User");
const JWTService = require("../Services/jwt");

const Jwt = new JWTService();

async function sign_up(req, res) {
  const { body } = req;
  if (!body.rut) return res.status(200).send({ message: "Rut obligatorio", status: "warning" });
  const findUser = await User.findOne({ rut: body.rut });
  if (findUser) return res.status(200).send({ message: "El usuario ya existe", status: "warning" });
  const usuario = {
    name: body.name,
    pass: body.pass,
    rut: body.rut,
    type: body.type,
  }
  const insertUser = await User.create(usuario);
  return res.status(200).send({
    create: insertUser,
    message: "Usuario creado exitosamente",
    refreshToken: Jwt.createAccessToken(insertUser),
    accessToken: Jwt.createAccessToken(insertUser),
    status: "success"
  });

}

async function sign_in(req, res) {
  const { body } = req;
  if (!body.rut) return res.status(200).send({ message: "Rut obligatorio", status: "warning" });
  if (!body.pass) return res.status(200).send({ message: "Contraseña obligatoria", status: "warning" });
  const findUser = await User.findOne({ rut: body.rut });
  if (!findUser) return res.status(200).send({ message: "El usuario no existe", status: "error" });
  if (findUser.pass != body.pass) return res.status(200).send({ message: "La contraseña no es correcta", status: "error" });

  return res.status(200).send({
    access: findUser,
    message: "Ingreso de usuario exitoso",
    refreshToken: Jwt.createAccessToken(findUser),
    accessToken: Jwt.createAccessToken(findUser),
    status: "success"
  });
}
module.exports = {
  sign_up,
  sign_in,
};