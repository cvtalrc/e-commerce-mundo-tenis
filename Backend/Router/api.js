const express = require("express");
const cookieParser = require("cookie-parser");
const func_product = require("../Controllers/prod_controllers");
const func_shoppingCart = require("../Controllers/shoppingCart_controllers");
const func_order = require("../Controllers/order_controllers");
const func_auth = require("../Controllers/auth");
const func_comment = require("../Controllers/comment_controllers");
const func_user = require("../Controllers/user_controllers");

const api = express.Router();
api.use(cookieParser());

//API POST
api.post("/sign-up", func_auth.sign_up); //registrar
api.post("/sign-in", func_auth.sign_in); //login
api.post("/sign-out", func_auth.authenticateToken, func_auth.sign_out); //salir
api.post("/product/", func_product.add);
api.post("/cart", func_auth.authenticateToken, func_shoppingCart.createEmpty_shoppingCart); //ahora solo se crea el carro cuando se registra el usuario
api.post("/cart/add", func_auth.authenticateToken, func_shoppingCart.addtoCart);
api.post("/order/", func_auth.authenticateToken, func_order.createOrder);
api.post("/comment/", func_auth.authenticateToken, func_comment.createComment);

//API GET
api.get("/user/", func_user.getAll);
api.get("/user/:User", func_auth.authenticateToken, func_user.getUser);
api.get("/product/", func_product.getAll);
api.get("/product/:id", func_product.getId);
api.get("/cart/:User", func_auth.authenticateToken, func_shoppingCart.getCart);
api.get("/order/:id", func_auth.authenticateToken, func_order.getOrder);
api.get("/comment/", func_comment.getAllComments);

//API DELETE
api.delete("/user/remove/:email", func_auth.authenticateToken, func_user.removeUser)
api.delete("/user/removeAll", func_user.removeAll);
api.delete("/product/:id", func_product.remove);
api.delete("/product/removeAll", func_product.removeAll);
api.delete("/cart/removeAll", func_shoppingCart.emptyCart);
api.delete("/cart/remove", func_auth.authenticateToken, func_shoppingCart.removeFromCart);
api.delete("/comment/:id", func_auth.authenticateToken, func_comment.deleteComment);

//API PUT
api.put("/product/update/:id", func_product.update);
api.put("/comment/update/:id", func_auth.authenticateToken, func_comment.updateComment);
api.put("/user/update/:id", func_auth.authenticateToken, func_user.updateUser);

module.exports = api;
