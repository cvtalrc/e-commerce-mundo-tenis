const WebpayPlus = require("transbank-sdk").WebpayPlus;
const Order = require("../Controllers/order_controllers");
const shoppingCart = require("../Controllers/shoppingCart_controllers");
const emailController = require('../Controllers/email_controllers');
const Payment = require("../Models/Payment");
const OrderM = require("../Models/Order");


const { Options, IntegrationApiKeys, Environment, IntegrationCommerceCodes } = require("transbank-sdk"); // CommonJS


// Configurar las credenciales de integración
const apiKey = "579B532A7440BB0C9079DED94D31EA1615BACEB56610332264630D42D0A36B1C";
const commerceCode = "597055555532";
//const returnUrl = "http://localhost:5173/payment";
const returnUrl = "http://52.3.204.14/api/payment";
async function generateTransaction(req, res) {
  const userToken = req.headers.authorization?.split(' ')[1]; //token usuario
  //const userToken = req.cookies.accessToken;
  const sessionID = userToken.substring(0, 10); // Obtener los primeros 10 caracteres
  const { userID, Delivery } = req.body
  //console.log(sessionID);
  const order = await Order.createOrder(userID, Delivery);
  //console.log(order._id.toString());
  //console.log(order.Cart[2]["Total"]);

  try {

    const tx = new WebpayPlus.Transaction(new Options(commerceCode, apiKey, Environment.Integration));
    const response = await tx.create(order._id.toString(), sessionID, order.Cart[2].Total, returnUrl);

    return res.status(200).send({
        url: response.url,
        token : response.token
    });

  } catch (error) {
    console.error("Error al generar la transacción:", error);
    return res.status(400).send({message: "Error al generar transaccion", status: "Error"})
  }
}

// Procesar la respuesta de Webpay después de que el usuario haya completado el pago
async function processPaymentWebpay(req, res) {
  console.log("funcion pago webpay")
  try {
    //let token = req.body.token_ws;
    //let tbkToken = req.body.TBK_TOKEN;
     let tokens = req.query;
     console.log("token pago vuelta", tokens)
     //let tbkToken = req.params.TBK_TOKEN;
    // let tbkOrdenCompra = params.TBK_ORDEN_COMPRA;
    // let tbkIdSesion = params.TBK_ID_SESION;
  
    //console.log(token)

    if (tokens.hasOwnProperty("token_ws") && !tokens.hasOwnProperty("TBK_TOKEN")) {//Flujo 1
      const token = tokens.token_ws;
      const commitResponse = await (new WebpayPlus.Transaction()).commit(token);
      if(commitResponse.response_code == 0){
         //aquí descontar stock, guardar pago y actualizar estado de la orden
      
        const reduceStock = await shoppingCart.reduceStock(commitResponse.buy_order ,(error, response) =>{
          if(error){
            throw error;
          }
        });

        const updateOrder = await Order.updateOrderStatusWebpay(commitResponse.buy_order, (error, response) =>{
          if(error){
            throw error;
          }
        });
        const order = await OrderM.findById(commitResponse.buy_order);

        const payment = new Payment({
          User: order.User,
          Details: commitResponse
        });

        await Payment.create(payment);

        const infoUser = {
          name: order.User.name + " " + order.User.lastName,
          email: order.User.email ,
        };
        
        const infoDelivery = {
          name: order.Delivery.name + " " + order.Delivery.lastName,
          address : order.Delivery.address ,
          comuna: order.Delivery.comuna,
          region: order.Delivery.region,
          cellNumber : order.Delivery.cellNumber,
          delivery: order.Delivery.delivery
        };
        const products = {
          items: order.Cart[1].Products,
          total: order.Cart[2].Total
        };
    
        await emailController.sendPaymentConfirmation(infoUser, infoDelivery, products);

        return res.status(200).send({
          message: "Pago realizado con éxito",
          order: updateOrder,
          detailsPayment: payment
        });
      } else {
        return res.status(400).send({
          message: "Solicitud de pago rechazada",
          status : "error"
        });
      }
     
    }
    else if (!tokens.hasOwnProperty("token_ws") && !tokens.hasOwnProperty("TBK_TOKEN")) {//Flujo 2
      return res.status(400).send("Pago anulado por tiempo de espera")
      // step = "El pago fue anulado por tiempo de espera.";
      // stepDescription = "En este paso luego de anulación por tiempo de espera (+10 minutos) no es necesario realizar la confirmación ";
    }
    else if (!tokens.hasOwnProperty("token_ws") && tokens.hasOwnProperty("TBK_TOKEN")) {//Flujo 3
      return res.status(400).send("Pago anulado por el usuario")
      // step = "El pago fue anulado por el usuario.";
      // stepDescription = "En este paso luego de abandonar el formulario no es necesario realizar la confirmación ";
    }
    else if (tokens.hasOwnProperty("token_ws") && tokens.hasOwnProperty("TBK_TOKEN")) {//Flujo 4
      return res.status(400).send("Pago inválido")
      // step = "El pago es inválido.";
      // stepDescription = "En este paso luego de abandonar el formulario no es necesario realizar la confirmación ";
    }
  } catch (error) {
    return res.status(400).send({
        message :"Error al procesar la respuesta de Webpay:",
        error: error
      });
  }
}

module.exports = {
  generateTransaction,
  processPaymentWebpay,
};
