const nodemailer = require('nodemailer');

const emailService = {
  sendEmail: async (to, subject, text, html) => {
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'MUNDOTENISCGA@gmail.com',
          pass: 'lngeerawelhdzswa',
        },
      });

      const mailOptions = {
        from: 'Mundo Tenis CGA',
        to,
        subject,
        text,
        html,
      };

      const info = await transporter.sendMail(mailOptions);
      console.log('Correo electrónico enviado correctamente:', info.response);
      return info;
    } catch (error) {
      console.log('Error al enviar el correo electrónico:', error);
      throw error;
    }
  },
};

module.exports = emailService;
