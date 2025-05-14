const jwt = require('jsonwebtoken');

const verificarToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Formato: Bearer <token>

  if (!token) {
    return res.status(401).json({ mensaje: 'Token no proporcionado.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decoded; // ahora puedes acceder a req.usuario.id y req.usuario.rol
    next();
  } catch (error) {
    return res.status(401).json({ mensaje: 'Token inválido o expirado.' });
  }
};

// Middleware adicional para verificar rol (ej: solo profesores)
const soloProfesores = (req, res, next) => {
  if (req.usuario.rol !== 'profesor') {
    return res.status(403).json({ mensaje: 'Acceso solo para profesores.' });
  }
  next();
};

module.exports = { verificarToken, soloProfesores };
