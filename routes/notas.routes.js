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

// Rutas
router.get('/', obtenerNotas);
router.get('/:id', obtenerNotaPorId);

router.post('/', validarNota, crearNota);
router.post('/masivo', validarNotasMasivas, crearNotasMasivas);

router.put('/:id', validarNota, actualizarNota);
router.delete('/:id', eliminarNota);

module.exports = router;


