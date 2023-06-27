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
      await sendEmail(infoUser.email, 'Confirmación de compra', '', html);
    } catch (error) {
      console.log('Error al enviar el correo electrónico:', error);
      throw error;
    }
  },
  sendResetPassword: async (name, email, resetPasswordLink) => {
    try {
      const template = 'reset-password'; // Nombre de la plantilla

      // Renderizar la plantilla con los datos
      const html = await ejs.renderFile(`Email-templates/${template}.ejs`, {
        name,
        email,
        resetPasswordLink
      });

      // Enviar el correo
      await sendEmail(email, ' Restablecimiento de contraseña', '', html);
    } catch (error) {
      console.log('Error al enviar el correo electrónico:', error);
      throw error;
    }
  },
  sendEmailConfirmation: async (name, email, confirmEmailLink) => {
    try {
      const template = 'email-confirmation'; // Nombre de la plantilla

      // Renderizar la plantilla con los datos
      const html = await ejs.renderFile(`Email-templates/${template}.ejs`, {
        name,
        email,
        confirmEmailLink
      });

      // Enviar el correo
      await sendEmail(email, '¡Valida tu cuenta en Mundo Tenis CGA!', '', html);
    } catch (error) {
      console.log('Error al enviar el correo electrónico:', error);
      throw error;
    }
  }
};

module.exports = emailController;
