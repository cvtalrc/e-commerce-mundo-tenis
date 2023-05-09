const express = require("express");
const func_autorizacion = require("../Controllers/autorizacion");
const func_agregar_producto = require("../Controllers/Agregar_producto");
const func_obtener_producto = require("../Controllers/Obtener_productos");
const func_eliminar_producto = require("../Controllers/Eliminar_producto");

const api = express.Router();

//API POST 
api.post("/autorizacion/register",func_autorizacion.register);
api.post("/producto/agregar",func_agregar_producto.add);
api.post("/producto/eliminar",func_eliminar_producto.remove);
//API GET
api.get("/producto/all",func_obtener_producto.get);

module.exports = api;