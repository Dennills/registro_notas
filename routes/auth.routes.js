const express = require('express');
const router = express.Router();
const { register, login, verificarCorreo } = require('../controllers/auth.controller'); // Importa la nueva función verificarCorreo

// Middleware para verificar token
const { verificarToken } = require('../middlewares/auth');

// Ruta para registrar un nuevo usuario
router.post('/register', register);

// Ruta para iniciar sesión
router.post('/login', login);

// Ruta protegida para probar el token
router.get('/perfil', verificarToken, (req, res) => {
  res.json({
    mensaje: 'Token válido ✅',
    usuario: req.usuario // esto viene del middleware: id y rol
  });
});

// Ruta para verificar el correo
router.get('/verificar/:token', verificarCorreo); // Aquí agregas la ruta de verificación

module.exports = router;
