const Nota = require('../models/nota.model');

// Obtener todas las notas
const obtenerNotas = async (req, res) => {
    try {
        const notas = await Nota.find();
        res.json(notas);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las notas' });
    }
};

// Crear una nueva nota
const crearNota = async (req, res) => {
    try {
        const { nombre, curso, nota } = req.body;

        if (!nombre || typeof nombre !== 'string') {
            return res.status(400).json({ error: 'El nombre es obligatorio y debe ser texto' });
        }
        if (!curso || typeof curso !== 'string') {
            return res.status(400).json({ error: 'El curso es obligatorio y debe ser texto' });
        }
        if (nota === undefined || typeof nota !== 'number' || nota < 0 || nota > 20) {
            return res.status(400).json({ error: 'La nota debe ser un número entre 0 y 20' });
        }

        const nuevaNota = new Nota({ nombre, curso, nota });
        await nuevaNota.save();

        res.status(201).json({ mensaje: 'Nota creada exitosamente', nota: nuevaNota });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear la nota' });
    }
};
// Crear varias notas de golpe
const crearNotasMasivas = async (req, res) => {
    try {
        const notas = req.body;

        if (!Array.isArray(notas) || notas.length === 0) {
            return res.status(400).json({ error: 'Debes enviar un array de notas' });
        }

        const nuevasNotas = await Nota.insertMany(notas);

        res.status(201).json({ mensaje: 'Notas registradas exitosamente', notas: nuevasNotas });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear notas masivamente' });
    }
};

// Obtener una nota por ID
const obtenerNotaPorId = async (req, res) => {
    try {
        const nota = await Nota.findById(req.params.id);
        if (!nota) {
            return res.status(404).json({ error: 'Nota no encontrada' });
        }
        res.json(nota);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la nota' });
    }
};

// Eliminar una nota por ID
const eliminarNota = async (req, res) => {
    try {
        const nota = await Nota.findByIdAndDelete(req.params.id);
        if (!nota) {
            return res.status(404).json({ error: 'Nota no encontrada para eliminar' });
        }
        res.json({ mensaje: 'Nota eliminada exitosamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la nota' });
    }
};

// Actualizar una nota por ID
const actualizarNota = async (req, res) => {
    try {
        const { nombre, curso, nota } = req.body;

        if (!nombre || typeof nombre !== 'string') {
            return res.status(400).json({ error: 'El nombre es obligatorio y debe ser texto' });
        }
        if (!curso || typeof curso !== 'string') {
            return res.status(400).json({ error: 'El curso es obligatorio y debe ser texto' });
        }
        if (nota === undefined || typeof nota !== 'number' || nota < 0 || nota > 20) {
            return res.status(400).json({ error: 'La nota debe ser un número entre 0 y 20' });
        }

        const notaActualizada = await Nota.findByIdAndUpdate(
            req.params.id,
            { nombre, curso, nota },
            { new: true }
        );

        if (!notaActualizada) {
            return res.status(404).json({ error: 'Nota no encontrada para actualizar' });
        }

        res.json({ mensaje: 'Nota actualizada exitosamente', nota: notaActualizada });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la nota' });
    }
};

module.exports = {
  obtenerNotas,
  crearNota,
  crearNotasMasivas,
  obtenerNotaPorId,
  actualizarNota,
  eliminarNota
};
