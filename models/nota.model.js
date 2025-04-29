const mongoose = require('mongoose');

const notaSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    curso: {
        type: String,
        required: [true, 'El curso es obligatorio']
    },
    nota: {
        type: Number,
        required: [true, 'La nota es obligatoria'],
        min: [0, 'La nota no puede ser menor que 0'],
        max: [20, 'La nota no puede ser mayor que 20']
    }
});

module.exports = mongoose.model('Nota', notaSchema);
