const express = require("express");
const func_product = require("../Controllers/prod_controllers");
const func_shoppingCart = require("../Controllers/shoppingCart_controllers");
const func_auth = require("../Controllers/auth");

const api = express.Router();

//API POST 
api.post("/product/add", func_product.add);
api.post("/product/modificate", func_product.modificate);
api.post("/product/removeAll", func_product.removeAll);
api.post("/sign-up", func_auth.sign_up);
api.post("/sign-in", func_auth.sign_in);
//API GET
api.get("/product/all", func_product.getAll);
api.get("/product/:id", func_product.getId);

module.exports = api;