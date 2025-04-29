const { body } = require('express-validator');
const validarErrores = require('./validarErrores');

// Validación para una sola nota
const validarNota = [
    body('nombre')
        .notEmpty().withMessage('El nombre es obligatorio')
        .isString().withMessage('El nombre debe ser texto'),
    body('curso')
        .notEmpty().withMessage('El curso es obligatorio')
        .isString().withMessage('El curso debe ser texto'),
    body('nota')
        .notEmpty().withMessage('La nota es obligatoria')
        .isNumeric().withMessage('La nota debe ser numérica')
        .custom((value) => value >= 0 && value <= 20)
        .withMessage('La nota debe estar entre 0 y 20'),
    validarErrores
];

// Validación para notas masivas
const validarNotasMasivas = [
    body().isArray().withMessage('Debes enviar un array de notas'),
    body('*.nombre')
        .notEmpty().withMessage('El nombre es obligatorio')
        .isString().withMessage('El nombre debe ser texto'),
    body('*.curso')
        .notEmpty().withMessage('El curso es obligatorio')
        .isString().withMessage('El curso debe ser texto'),
    body('*.nota')
        .notEmpty().withMessage('La nota es obligatoria')
        .isNumeric().withMessage('La nota debe ser numérica')
        .custom((value) => value >= 0 && value <= 20)
        .withMessage('La nota debe estar entre 0 y 20'),
    validarErrores
];

module.exports = {
    validarNota,
    validarNotasMasivas
};
