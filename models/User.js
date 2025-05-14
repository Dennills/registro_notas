const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  correo: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  contraseña: {
    type: String,
    required: true
  },
  rol: {
    type: String,
    enum: ['profesor', 'estudiante'],
    required: true
  }, // Aquí faltaba una coma
  verificado: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Hashear contraseña solo si fue modificada o es nueva
userSchema.pre('save', async function (next) {
  if (!this.isModified('contraseña')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.contraseña = await bcrypt.hash(this.contraseña, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Método para comparar contraseñas
userSchema.methods.compararContraseña = function (contraseñaIngresada) {
  return bcrypt.compare(contraseñaIngresada, this.contraseña);
};

module.exports = mongoose.model('User', userSchema);
