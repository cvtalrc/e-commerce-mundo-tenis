const express = require("express");
const cookieParser = require("cookie-parser");
const func_product = require("../Controllers/prod_controllers");
const func_shoppingCart = require("../Controllers/shoppingCart_controllers");
const func_order = require("../Controllers/order_controllers");
const func_auth = require("../Controllers/auth");
const func_comment = require("../Controllers/comment_controllers");
const func_user = require("../Controllers/user_controllers");
const func_payment = require("../Controllers/payment_controllers");
const func_guestCart = require("../Controllers/guestShoppingCart_controllers");

const api = express.Router();
api.use(cookieParser());

//API POST
api.post("/sign-up", func_auth.sign_up); //registrar
api.post("/sign-in", func_auth.sign_in); //login
api.post("/sign-out", func_auth.authenticateToken, func_auth.sign_out); //salir
api.post("/product/", func_product.add);
api.post("/cart", func_auth.authenticateToken, func_shoppingCart.createEmpty_shoppingCart); //ahora solo se crea el carro cuando se registra el usuario
api.post("/guestCart/", func_guestCart.createEmpty_shoppingCart);
api.post("/cart/add", func_auth.authenticateToken, func_shoppingCart.addtoCart);
api.post("/guestCart/add", func_guestCart.addtoCart);
api.post("/order/", func_auth.authenticateToken, func_order.createOrder);
api.post("/comment/", func_auth.authenticateToken, func_comment.createComment);

//API GET
api.get("/user/", func_user.getAll);
api.get("/user/:id", func_auth.authenticateToken, func_user.getUser); //la cata le sacó el token pero debe tener uno
api.get("/product/", func_product.getAll);
api.get("/product/:id", func_product.getId);
api.get("/cart/:user", func_auth.authenticateToken, func_shoppingCart.getCart);
api.get("/guestCart/:sessionID", func_guestCart.getCart);
api.get("/order/:id", func_auth.authenticateToken, func_order.getOrder);
api.get("/order/", func_order.getAll);
api.get("/comment/", func_comment.getAllComments);

//API DELETE
api.delete("/user/remove/:id", func_auth.authenticateToken, func_user.removeUser)
api.delete("/user/removeAll", func_user.removeAll);
api.delete("/product/:id", func_product.remove);
api.delete("/product/removeAll", func_product.removeAll);
api.delete("/cart/removeAll", func_shoppingCart.emptyCart);
api.delete("/guestCart/removeAll", func_guestCart.emptyCart);
api.delete("/cart/remove", func_auth.authenticateToken, func_shoppingCart.removeFromCart);
api.delete("/guestCart/remove", func_guestCart.removeFromCart);
api.delete("/order/", func_order.removeAll);
api.delete("/comment/:id", func_auth.authenticateToken, func_comment.deleteComment);

//API PUT
api.put("/user/update/:id", func_auth.authenticateToken, func_user.updateUser);
api.put("/product/update/:id", func_product.update);
api.put("/cart/update/:orderID", func_shoppingCart.reduceStock);
api.put("/order/update/:id", func_auth.authenticateToken, func_order.updateOrderStatus)
api.put("/comment/update/:id", func_auth.authenticateToken, func_comment.updateComment);

api.post("/payment", func_auth.authenticateToken, func_payment.generateTransaction)
api.get("/verify-payment", func_payment.processPaymentWebpay)

module.exports = api;
