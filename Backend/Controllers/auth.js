const User = require("../Models/User");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "mundotenisCGA_SECRETKEY"; // Reemplaza con tu clave secreta
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;
const shoppingCart = require("../Controllers/shoppingCart_controllers");
const emailController = require('../Controllers/email_controllers');

async function sign_up(req, res) {
  const { body } = req;

  if (!body.name)
    return res.status(400).send({ message: "Nombre de usuario obligatorio", status: "warning" });
  if (!body.lastName)
    return res.status(400).send({ message: "Apellido obligatorio", status: "warning" });
  if (!body.email)
    return res.status(400).send({ message: "Email obligatorio", status: "warning" });
  if (!body.pass)
    return res.status(400).send({ message: "Contraseña obligatoria", status: "warning" });
  if (!body.address)
    return res.status(400).send({ message: "Direccion obligatoria", status: "warning" });
  if (!body.region)
      return res.status(400).send({ message: "Region obligatoria", status: "warning" });
  if (!body.comuna)
      return res.status(400).send({ message: "Comuna obligatoria", status: "warning" });
  if (!body.cellNumber)
      return res.status(400).send({ message: "Numero de telefono obligatorio", status: "warning" });

  const findUser = await User.findOne({ email: body.email });

  if (findUser)
    return res.status(400).send({ message: "El correo ingresado ya posee una cuenta", status: "warning" });
  try{

    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hash = await bcrypt.hash(body.pass, salt);

    const user = {
      name: body.name,
      lastName: body.lastName,
      email: body.email,
      pass: hash,
      address: body.address,
      region: body.region,
      comuna: body.comuna,
      cellNumber: body.cellNumber,
      type: body.type,
      active: false
    };
    const insertUser = await User.create(user);
    //Crear el carrito asociado al usuario
    await shoppingCart.createEmpty_shoppingCart(insertUser._id);
    const email = body.email
    const name = body.name + " " + body.lastName
    //Verificacion del email
    const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: '1h' });
    
    //const confirmEmailLink = `http://localhost:5173/email-validate?token=${token}`;
    const confirmEmailLink = `http://52.3.204.14/api/email-validate?token=${token}`;
    await emailController.sendEmailConfirmation(name, email, confirmEmailLink);
    return res.status(200).send({
      create: insertUser,
      message: "Usuario creado exitosamente",
      status: "success"
    });
  }catch(error){
    return res.status(500).send({ message: "Error al crear el usuario", error:error, status: "error" });
  }
}

async function sign_in(req, res) {
  const { body } = req;
  if (!body.email)
    return res.status(400).send({ message: "Email obligatorio", status: "warning" });
  if (!body.pass)
    return res.status(400).send({ message: "Contraseña obligatoria", status: "warning" });

  const findUser = await User.findOne({ email: body.email });
  if (!findUser) return res.status(400).send({ message: "El usuario no existe", status: "error" });
  if(!findUser.active) return res.status(400).send({ message: "El usuario no está activo, debe validar su correo", status: "error" });
  const isPasswordCorrect = await bcrypt.compare(body.pass, findUser.pass);
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "La contraseña actual no es correcta" , status: "error"});
  }

  const userWithoutPass = { ...findUser.toObject() };
  delete userWithoutPass.pass;

  const accessToken = jwt.sign({ userId: findUser.id, ...userWithoutPass }, SECRET_KEY);

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: true,
  });

  return res.status(200).send({
    access: userWithoutPass,
    message: "Ingreso de usuario exitoso",
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
  //const token = req.cookies.accessToken;
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).send({ message: "No se proporcionó un token de acceso", status: "error",});
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(401).send({ message: "Token de acceso inválido", status: "error" });
    req.user = user;
    next();
  });
}

function authenticateAdmin(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  const role = req.body.type;
  // Verificar si el usuario es administrador
  if (token && role === 'admin') {
    next();
  } else {
    res.status(403).send('Acceso denegado');
  }
};

module.exports = {
  sign_up,
  sign_in,
  sign_out,
  authenticateToken,
  authenticateAdmin,
  SECRET_KEY,
  SALT_ROUNDS
};
