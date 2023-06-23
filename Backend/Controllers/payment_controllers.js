const webpay = require("transbank-sdk").WebpayPlus;

// Configurar las credenciales de integración
const apiKey = "TU_API_KEY";
const commerceCode = "TU_CODIGO_DE_COMERCIO";
const returnUrl = "https://tu_sitio.com/pago/retorno";

async function generateTransaction(monto, descripcion) {
  try {
    const transaction = new webpay.Transaction();

    transaction.commerceCode = commerceCode;
    transaction.apiKey = apiKey;
    transaction.returnUrl = returnUrl;
    transaction.amount = monto;
    transaction.sessionId = "ID_DE_SESION";
    transaction.buyOrder = "ID_DE_ORDEN";
    transaction.details = [
      {
        amount: monto,
        commerceCode: commerceCode,
        buyOrder: "ID_DE_ORDEN",
        description: descripcion,
      },
    ];

    // Generar la transacción
    const response = await transaction.create();

    // Obtener la URL de redirección
    const url = response.url;

    // Redirigir al usuario a la URL de Webpay
    // (puedes implementar esto en tu frontend)
    console.log("Redirigir al usuario a:", url);
  } catch (error) {
    console.error("Error al generar la transacción:", error);
  }
}

// Procesar la respuesta de Webpay después de que el usuario haya completado el pago
async function processPaymentWebpay(token) {
  try {
    // Obtener los detalles de la transacción desde Webpay
    const transaction = new webpay.Transaction();
    transaction.commerceCode = commerceCode;
    transaction.apiKey = apiKey;
    const response = await transaction.commit(token);

    // Verificar el estado de la transacción
    if (response.status === "AUTHORIZED") {
      // La transacción se realizó correctamente

      await Order.findByIdAndUpdate(transaction.buyOrder, { status: "paid" });

      console.log("Transacción autorizada:", response);
    } else {
      // La transacción no se realizó correctamente

      // Manejar el error adecuadamente
      console.error("Error en la transacción:", response);
    }
  } catch (error) {
    console.error("Error al procesar la respuesta de Webpay:", error);
  }
}

module.exports = {
  generateTransaction,
  processPaymentWebpay,
};
