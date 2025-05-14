const User = require('../models/User');
const jwt = require('jsonwebtoken');
const enviarCorreo = require('../utils/enviarCorreo');

// Función para generar token
const generarToken = (usuario) => {
  return jwt.sign(
    { id: usuario._id, rol: usuario.rol },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
};

// REGISTRO DE USUARIO
const register = async (req, res) => {
  try {
    const { nombre, correo, contraseña, rol } = req.body;

    // Verificar si ya existe el usuario
    const usuarioExistente = await User.findOne({ correo });
    if (usuarioExistente) {
      return res.status(400).json({ mensaje: 'El correo ya está registrado.' });
    }

    // Crear y guardar nuevo usuario
    const nuevoUsuario = new User({ nombre, correo, contraseña, rol });
    await nuevoUsuario.save();

    // 👉 Generar token de verificación
    const tokenVerificacion = jwt.sign(
      { id: nuevoUsuario._id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' } // válido por 1 día
    );

    // 👉 Crear link de verificación
    const linkVerificacion = `http://localhost:3000/api/auth/verificar/${tokenVerificacion}`;

    // 👉 Enviar correo de verificación
    await enviarCorreo(
      nuevoUsuario.correo,
      'Verifica tu cuenta 📬',
      `<h3>Hola ${nuevoUsuario.nombre},</h3>
       <p>Haz clic en el siguiente enlace para verificar tu cuenta:</p>
       <a href="${linkVerificacion}">Verificar correo</a>`
    );

    res.status(201).json({
      mensaje: 'Usuario registrado. Verifica tu correo electrónico.'
    });

  } catch (error) {
    res.status(500).json({ mensaje: 'Error al registrar usuario.', error: error.message });
  }
};

// LOGIN DE USUARIO
const login = async (req, res) => {
  try {
    const { correo, contraseña } = req.body;

    // Buscar usuario por correo
    const usuario = await User.findOne({ correo });
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado.' });
    }

    // Comparar contraseña
    const esCorrecta = await usuario.compararContraseña(contraseña);
    if (!esCorrecta) {
      return res.status(401).json({ mensaje: 'Contraseña incorrecta.' });
    }

    // Generar token JWT
    const token = generarToken(usuario);

    res.json({
      mensaje: 'Inicio de sesión exitoso.',
      token,
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        correo: usuario.correo,
        rol: usuario.rol
      }
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al iniciar sesión.', error: error.message });
  }
};

// FUNCION PARA VERIFICAR EL CORREO
const verificarCorreo = async (req, res) => {
  const { token } = req.params;

  try {
    // Verificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Buscar el usuario con el id decodificado
    const usuario = await User.findById(decoded.id);
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado.' });
    }

    // Marcar el usuario como verificado
    usuario.verificado = true; // Asegúrate de tener el campo "verificado" en tu modelo de usuario
    await usuario.save();

    res.json({
      mensaje: 'Correo verificado correctamente. Ahora puedes iniciar sesión.'
    });

  } catch (error) {
    res.status(500).json({ mensaje: 'Error al verificar correo.', error: error.message });
  }
};

module.exports = { register, login, verificarCorreo };
