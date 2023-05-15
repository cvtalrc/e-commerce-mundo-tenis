const express = require("express");
const func_product = require("../Controllers/prod_controllers");
const func_shoppingCart = require("../Controllers/shoppingCart_controllers");
const func_auth = require("../Controllers/auth");

const api = express.Router();

//API POST 
api.post("/product/add", func_product.add);
api.post("/product/remove", func_product.remove);
api.post("/user/sign-up", func_auth.sign_up);
api.post("/user/sign-in", func_auth.sign_in);
//API GET
api.get("/Product/all", func_product.get);

module.exports = api;