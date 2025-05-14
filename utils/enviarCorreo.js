const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const enviarCorreo = async (to, subject, html) => {
  try {
    await transporter.sendMail({
      from: `"Registro de Notas" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html
    });
    console.log('📩 Correo enviado a:', to);
  } catch (error) {
    console.error('❌ Error al enviar correo:', error);
    throw error;
  }
};

module.exports = enviarCorreo;
