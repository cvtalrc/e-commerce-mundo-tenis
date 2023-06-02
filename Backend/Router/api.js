const express = require("express");
const func_product = require("../Controllers/prod_controllers");
const func_shoppingCart = require("../Controllers/shoppingCart_controllers");
const func_auth = require("../Controllers/auth");

const api = express.Router();

//API POST 
api.post("/product/", func_product.add);
api.put("/product/update", func_product.update);
api.post("/product/removeAll", func_product.removeAll);
api.delete("/product/:id", func_product.remove);
api.post("/sign-up", func_auth.sign_up); //registrar
api.post("/sign-in", func_auth.sign_in); //login
api.post("/cart",func_shoppingCart.createEmpty_shoppingCart);
api.post("/cart/add",func_shoppingCart.addtoCart);
api.post("/cart/remove",func_shoppingCart.removeFromCart);
api.post("/cart/removeAll",func_shoppingCart.emptyCart);

//API PUT 
api.put("/product/update", func_product.update);

//API GET
api.get("/product/", func_product.getAll);
api.get("/product/:id", func_product.getId);
api.get("/cart/:User", func_shoppingCart.GetCart);

module.exports = api;