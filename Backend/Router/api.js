const express = require("express");
const func_producto = require("../Controllers/prod_controllers");
const func_carro = require("../Controllers/carro_controllers");
const func_auth =  require("../Controllers/auth");

const api = express.Router();

//API POST 
api.post("/producto/agregar",func_producto.add);
api.post("/producto/eliminar",func_producto.remove);
api.post("/sign-up", func_auth.sign_up);
api.post("/sign-in", func_auth.sign_in);
//API GET
api.get("/producto/all",func_producto.get);

module.exports = api;