const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');

// Cargar variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware de seguridad y optimización
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(express.json()); // Importante: después de helmet y cors

app.use((req, res, next) => {
  const methodsWithBody = ['POST', 'PUT', 'PATCH'];
  if (methodsWithBody.includes(req.method) && req.headers['content-type']?.includes('application/json')) {
    let data = '';
    req.on('data', chunk => data += chunk);
    req.on('end', () => {
      if (!data) {
        return res.status(400).json({ ok: false, error: 'Se esperaba un body JSON pero estaba vacío.' });
      }
      try {
        req.body = JSON.parse(data);
        next();
      } catch (err) {
        return res.status(400).json({ ok: false, error: 'JSON inválido.' });
      }
    });
  } else {
    next();
  }
});



// Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('✅ Conectado a MongoDB Atlas'))
    .catch((error) => console.error('❌ Error al conectar a MongoDB:', error));

// Importar rutas
const notasRoutes = require('./routes/notas.routes');
const authRoutes = require('./routes/auth.routes'); // Solo lo importas una vez

// Usar rutas
app.use('/api/notas', notasRoutes);
app.use('/api/auth', authRoutes); // Usamos authRoutes aquí

// Ruta principal
app.get('/', (req, res) => {
    res.send('Servidor de registro de notas funcionando 🎯');
});

// Ruta para forzar un error manual
app.get('/error-forzado', (req, res, next) => {
    const error = new Error('Este es un error forzado para probar el middleware.');
    error.status = 500;
    next(error);
});

// Middleware de errores
const errorHandler = require('./middlewares/errorHandler');
app.use(errorHandler);

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
});

app.get('/api/health', (req, res) => {
  res.status(200).send('OK');
});
