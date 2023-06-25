const WebpayPlus = require("transbank-sdk").WebpayPlus;
const Order = require("../Controllers/order_controllers");
const shoppingCart = require("../Controllers/shoppingCart_controllers");
const Payment = require("../Models/Payment");

const { Options, IntegrationApiKeys, Environment, IntegrationCommerceCodes } = require("transbank-sdk"); // CommonJS


// Configurar las credenciales de integración
const apiKey = "579B532A7440BB0C9079DED94D31EA1615BACEB56610332264630D42D0A36B1C";
const commerceCode = "597055555532";
const returnUrl = "http://localhost:5173/payment";

async function generateTransaction(req, res) {
  //const userToken = req.headers.authorization?.split(' ')[1]; //token usuario
  const userToken = req.cookies.accessToken;
  const sessionID = userToken.substring(0, 10); // Obtener los primeros 10 caracteres
  const { userID, Delivery } = req.body
  console.log(sessionID);
  const order = await Order.createOrder(userID, Delivery);
  console.log(order._id.toString());
  console.log(order.Cart[2]["Total"]);

  try {

    const tx = new WebpayPlus.Transaction(new Options(commerceCode, apiKey, Environment.Integration));
    const response = await tx.create(order._id.toString(), sessionID, order.Cart[2].Total, returnUrl);

    return res.status(200).send({
        url: response.url,
        token : response.token
    });

  } catch (error) {
    console.error("Error al generar la transacción:", error);
  }
}

// Procesar la respuesta de Webpay después de que el usuario haya completado el pago
async function processPaymentWebpay(req, res) {
  try {
    //let token = req.body.token_ws;
    //let tbkToken = req.body.TBK_TOKEN;
     let token = req.params.token_ws;
     let tbkToken = req.params.TBK_TOKEN;
    // let tbkOrdenCompra = params.TBK_ORDEN_COMPRA;
    // let tbkIdSesion = params.TBK_ID_SESION;
  
    console.log(token)

    if (token && !tbkToken) {//Flujo 1
      const commitResponse = await (new WebpayPlus.Transaction()).commit(token);
      viewData = {
        token,
        commitResponse,
      };
      
      //aquí descontar stock, guardar pago y actualizar estado de la orden
      const reduceStock = await shoppingCart.reduceStock(commitResponse.buy_order ,(error, response) =>{
        if(error){
          throw error;
        }
      });

      const updateOrder = await Order.updateOrder(commitResponse.buy_order, (error, response) =>{
        if(error){
          throw error;
        }
      });

      const payment = new Payment({
        Details: commitResponse
      });

      return res.status(200).send({
        message: "Pago realizado con éxito",
        order: updateOrder,
        detailsPayment: payment
      })
    }
    else if (!token && !tbkToken) {//Flujo 2
      return res.status(200).send("Pago anulado por tiempo de espera")
      // step = "El pago fue anulado por tiempo de espera.";
      // stepDescription = "En este paso luego de anulación por tiempo de espera (+10 minutos) no es necesario realizar la confirmación ";
    }
    else if (!token && tbkToken) {//Flujo 3
      return res.status(200).send("Pago anulado por el usuario")
      // step = "El pago fue anulado por el usuario.";
      // stepDescription = "En este paso luego de abandonar el formulario no es necesario realizar la confirmación ";
    }
    else if (token && tbkToken) {//Flujo 4
      return res.status(200).send("Pago inválido")
      // step = "El pago es inválido.";
      // stepDescription = "En este paso luego de abandonar el formulario no es necesario realizar la confirmación ";
    }
  } catch (error) {
    return res.status(400).send({
        msj: "Error al procesar la respuesta de Webpay:",
        error: error
      });
  }
}

module.exports = {
  generateTransaction,
  processPaymentWebpay,
};
