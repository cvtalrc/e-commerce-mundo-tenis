const User = require("../Models/User");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "mundotenisCGA_SECRETKEY"; // Reemplaza con tu clave secreta
const shoppingCart = require("../Controllers/shoppingCart_controllers");

async function sign_up(req, res) {
  const { body } = req;

  if (!body.name)
    return res
      .status(200)
      .send({ message: "Nombre de usuario obligatorio", status: "warning" });
  if (!body.lastname)
    return res
      .status(200)
      .send({ message: "Apellido obligatorio", status: "warning" });
  if (!body.email)
    return res
      .status(200)
      .send({ message: "Email obligatorio", status: "warning" });
  if (!body.pass)
    return res
      .status(200)
      .send({ message: "Contraseña obligatoria", status: "warning" });
  if (!body.address)
    return res
      .status(200)
      .send({ message: "Direccion obligatoria", status: "warning" });
  if (!body.region)
      return res
        .status(200)
        .send({ message: "Region obligatoria", status: "warning" });
  if (!body.comuna)
      return res
        .status(200)
        .send({ message: "Comuna obligatoria", status: "warning" });
  if (!body.cellNumber)
      return res
        .status(200)
        .send({ message: "Numero de telefono obligatorio", status: "warning" });


  const findUser = await User.findOne({ email: body.email });

  if (findUser)
    return res
      .status(200)
      .send({ message: "El correo ingresado ya posee una cuenta", status: "warning" });

  const usuario = {
    name: body.name,
    lastName: body.lastname,
    email: body.email,
    pass: body.pass,
    address: body.address,
    region: body.region,
    comun: body.comuna,
    cellNumber: body.cellNumber,
    type: body.type,
  };
  const insertUser = await User.create(usuario);
  // Crear el carrito asociado al usuario
  await shoppingCart.createEmpty_shoppingCart(req, res, body.email);

  const accessToken = jwt.sign({ userId: insertUser.id }, SECRET_KEY);

  res.cookie("refreshToken", accessToken, {
    httpOnly: true,
    secure: true,
  });

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: true,
  });

  return res.status(200).send({
    create: insertUser,
    message: "Usuario creado exitosamente",
    status: "success"
  });
}

async function sign_in(req, res) {
  const { body } = req;
  if (!body.email)
    return res
      .status(200)
      .send({ message: "Email obligatorio", status: "warning" });
  if (!body.pass)
    return res
      .status(200)
      .send({ message: "Contraseña obligatoria", status: "warning" });

  const findUser = await User.findOne({ email: body.email });
  if (!findUser)
    return res
      .status(200)
      .send({ message: "El usuario no existe", status: "error" });
  if (findUser.pass != body.pass)
    return res
      .status(200)
      .send({ message: "La contraseña no es correcta", status: "error" });

  const userWithoutPass = { ...findUser.toObject() };
  delete userWithoutPass.pass;

  const accessToken = jwt.sign(
    { userId: findUser.id, ...userWithoutPass },
    SECRET_KEY
  );

  res.cookie("refreshToken", accessToken, {
    httpOnly: true,
    secure: true,
  });

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: true,
  });

  return res.status(200).send({
    access: userWithoutPass,
    message: "Ingreso de usuario exitoso",
    refreshToken: accessToken,
    accessToken: accessToken,
    status: "success",
    name: userWithoutPass.name,
    email: userWithoutPass.email,
    type: userWithoutPass.type
  });
}

function sign_out(req, res) {
  res.clearCookie("refreshToken");
  res.clearCookie("accessToken");

  return res.status(200).send({
    message: "Sesión cerrada exitosamente",
    status: "success",
  });
}

function authenticateToken(req, res, next) {
  const token = req.cookies.accessToken;
  //const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res
      .status(401)
      .send({
        message: "No se proporcionó un token de acceso",
        status: "error",
      });
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res
        .status(401)
        .send({ message: "Token de acceso inválido", status: "error" });
    }

    req.user = user;
    next();
  });
}

module.exports = {
  sign_up,
  sign_in,
  sign_out,
  authenticateToken,
  SECRET_KEY,
};
