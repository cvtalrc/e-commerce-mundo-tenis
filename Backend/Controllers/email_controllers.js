const ejs = require('ejs');
const { sendEmail } = require('../Services/emailService');

const emailController = {
  sendPaymentConfirmation: async (infoUser, infoDelivery, products) => {
    try {
      const template = 'payment-confirmation'; // Nombre de la plantilla

      // Renderizar la plantilla con los datos
      const html = await ejs.renderFile(`Email-templates/${template}.ejs`, {
        infoUser,
        infoDelivery,
        products
      });

      // Enviar el correo
      await sendEmail(infoUser.email, 'Confirmación de pago', '', html);
    } catch (error) {
      console.log('Error al enviar el correo electrónico:', error);
      throw error;
    }
  },
};

module.exports = emailController;
