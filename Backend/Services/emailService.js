const nodemailer = require('nodemailer');

const emailService = {
  sendEmail: async (to, subject, text, html) => {
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'fernanda.lorcab@gmail.com',
          pass: 'uwlmcbwntdruunny',
        },
      });

      const mailOptions = {
        from: 'fernanda.lorcab@gmail.com',
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
