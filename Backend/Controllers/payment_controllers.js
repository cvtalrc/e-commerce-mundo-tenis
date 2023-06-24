const WebpayPlus = require("transbank-sdk").WebpayPlus;
const Order = require("../Controllers/order_controllers");

const { Options, IntegrationApiKeys, Environment, IntegrationCommerceCodes } = require("transbank-sdk"); // CommonJS


// Configurar las credenciales de integración
const apiKey = "579B532A7440BB0C9079DED94D31EA1615BACEB56610332264630D42D0A36B1C";
const commerceCode = "597055555532";
const returnUrl = "http://localhost:5173/payment";

async function generateTransaction(req, res) {
  const sessionID = req.headers.authorization?.split(' ')[1]; //token usuario
  const { userID, delivery } = req.body

  const order = Order.createOrder(userID, delivery);
  console.log(order);
  try {

    const tx = new WebpayPlus.Transaction(new Options(commerceCode, apiKey, Environment.Integration));
    const response = await tx.create(order._id, sessionID, order.Cart[1].Total, returnUrl);

    return res.status(200).send({
        url: response.url,
        token : response.url
    });

  } catch (error) {
    console.error("Error al generar la transacción:", error);
  }
}

// Procesar la respuesta de Webpay después de que el usuario haya completado el pago
async function processPaymentWebpay(token) {
  try {
    console.log(token)
    const commitResponse = await (new WebpayPlus.Transaction()).commit(token);

    if (token && !tbkToken) {//Flujo 1
      const commitResponse = await (new WebpayPlus.Transaction()).commit(token);
      viewData = {
        token,
        commitResponse,
      };
      return commitResponse
      response.render("webpay_plus/commit", {
        step,
        stepDescription,
        viewData,
      });
      return;
    }
    else if (!token && !tbkToken) {//Flujo 2
      step = "El pago fue anulado por tiempo de espera.";
      stepDescription = "En este paso luego de anulación por tiempo de espera (+10 minutos) no es necesario realizar la confirmación ";
    }
    else if (!token && tbkToken) {//Flujo 3
      step = "El pago fue anulado por el usuario.";
      stepDescription = "En este paso luego de abandonar el formulario no es necesario realizar la confirmación ";
    }
    else if (token && tbkToken) {//Flujo 4
      step = "El pago es inválido.";
      stepDescription = "En este paso luego de abandonar el formulario no es necesario realizar la confirmación ";
    }
  } catch (error) {
    console.error("Error al procesar la respuesta de Webpay:", error);
  }
}

module.exports = {
  generateTransaction,
  processPaymentWebpay,
};
