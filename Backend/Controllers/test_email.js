const Order = require("../Models/Order");
const emailController = require('../Controllers/email_controllers');

async function test(req, res){
  try{
    const orderID = req.body.orderID;
    const order = await Order.findById(orderID);
    //console.log(order);
  
    const infoUser = {
      name: order.User.name + " " + order.User.lastName,
      email: order.User.email ,
    };
  
    const infoDelivery = {
      //type: order.Delivery.
      name: order.Delivery.name + " " + order.Delivery.lastName,
      address : order.Delivery.address + " " + order.Delivery.comuna + " " + order.Delivery.region,
      cellNumber : order.Delivery.cellNumber
    };

    const products = {
      items: order.Cart[1].Products
    };

    await emailController.sendPaymentConfirmation(infoUser, infoDelivery, products);
    return res.status(200).send({message: "Correo de confirmación de pago enviado con éxito", status: "success"});
  }catch(error){
    return res.status(400).send({message: "No se pudo enviar el mail", status: "error"});
  }


}

module.exports = {
  test,
};