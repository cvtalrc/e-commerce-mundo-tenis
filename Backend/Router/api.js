const express = require("express");
const func_autorizacion = require("../Controllers/autorizacion");
const func_producto = require("../Controllers/prod_controllers");
const func_carro = require("../Controllers/carro_controllers");

const api = express.Router();

//API POST 
api.post("/autorizacion/register",func_autorizacion.register);
api.post("/producto/agregar",func_producto.add);
api.post("/producto/eliminar",func_producto.remove);
//API GET
api.get("/producto/all",func_producto.get);

module.exports = api;