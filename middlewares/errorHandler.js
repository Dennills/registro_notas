// middlewares/errorHandler.js
const errorHandler = (err, req, res, next) => {
    console.error('🚨 Error detectado:', err);

    res.status(err.statusCode || 500).json({
        ok: false,
        error: err.message || 'Error interno del servidor',
    });
};

module.exports = errorHandler;
