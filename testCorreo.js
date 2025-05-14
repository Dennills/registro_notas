const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false, // true para puerto 465, false para 587
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const mailOptions = {
  from: `"Notas UNFV" <${process.env.EMAIL_USER}>`,
  to: 'denniltol@gmail.com',
  subject: 'Prueba de correo',
  text: 'Este es un mensaje de prueba de pataso'
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.error('❌ Error al enviar correo:', error);
  }
  console.log('✅ Correo enviado:', info.response);
});
