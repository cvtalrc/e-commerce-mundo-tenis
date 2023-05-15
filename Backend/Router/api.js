const express = require("express");
const func_Product = require("../Controllers/prod_controllers");
const func_shoppingCart = require("../Controllers/shoppingCart_controllers");
const func_auth = require("../Controllers/auth");

const api = express.Router();

//API POST 
api.post("/Product/add", func_Product.add);
api.post("/Product/remove", func_Product.remove);
api.post("/sign-up", func_auth.sign_up);
api.post("/sign-in", func_auth.sign_in);
//API GET
api.get("/Product/all", func_Product.get);

module.exports = api;