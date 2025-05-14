const express = require('express');
const router = express.Router();

// Importar controladores
const {
  obtenerNotas,
  crearNota,
  crearNotasMasivas,
  obtenerNotaPorId,
  actualizarNota,
  eliminarNota
} = require('../controllers/notas.controller');

// Importar validaciones
const { validarNota, validarNotasMasivas } = require('../middlewares/validarNotas');

// 🛡️ Importar middlewares de autenticación
const { verificarToken, soloProfesores } = require('../middlewares/auth');

// Rutas protegidas
router.get('/', verificarToken, obtenerNotas);
router.get('/:id', verificarToken, obtenerNotaPorId);

router.post('/', verificarToken, soloProfesores, validarNota, crearNota);
router.post('/masivo', verificarToken, soloProfesores, validarNotasMasivas, crearNotasMasivas);

router.put('/:id', verificarToken, soloProfesores, validarNota, actualizarNota);
router.delete('/:id', verificarToken, soloProfesores, eliminarNota);

module.exports = router;
