const express = require("express");
var session = require('express-session')
const cookieParser = require("cookie-parser");
const func_product = require("../Controllers/prod_controllers");
const func_shoppingCart = require("../Controllers/shoppingCart_controllers");
const func_order = require("../Controllers/order_controllers");
const func_auth = require("../Controllers/auth");

const api = express.Router();
api.use(cookieParser());
//API POST 
api.post("/product/", func_product.add);
api.post("/product/removeAll", func_product.removeAll);
api.delete("/product/:id", func_product.remove);
api.delete("/user/removeAll", func_auth.removeAll);
api.post("/sign-up", func_auth.sign_up); //registrar
api.post("/sign-in", func_auth.sign_in); //login
api.post("/sign-out", func_auth.authenticateToken, func_auth.sign_out);
api.post("/cart", func_auth.authenticateToken, func_shoppingCart.createEmpty_shoppingCart);
api.post("/cart/add", func_auth.authenticateToken, func_shoppingCart.addtoCart);
api.post("/cart/remove", func_auth.authenticateToken, func_shoppingCart.removeFromCart);
api.post("/cart/removeAll",func_shoppingCart.emptyCart);
api.post("/order/", func_auth.authenticateToken, func_order.createOrder);

//API PUT 
api.put("/product/update", func_product.update);

//API GET
api.get("/product/", func_product.getAll);
api.get("/product/:id", func_product.getId);
api.get("/order/:id", func_order.getOrder);
api.get("/cart/:User", func_auth.authenticateToken, func_shoppingCart.GetCart);
api.get("/user/", func_auth.getAll);
api.get("/user/:User",  func_auth.authenticateToken, func_auth.getUser);

module.exports = api;