/** Manejo global de errores: nunca filtra detalles internos al cliente. */
const AppError = require('../utils/AppError');

const notFound = (_req, _res, next) => next(new AppError('Ruta no encontrada', 404));

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, _req, res, _next) => {
  // Violación de UNIQUE en PostgreSQL (ej. correo repetido)
  if (err.code === '23505') return res.status(409).json({ message: 'Ese registro ya existe' });
  if (err.type === 'entity.parse.failed') return res.status(400).json({ message: 'JSON inválido' });

  if (err instanceof AppError) return res.status(err.status).json({ message: err.message });

  console.error(err); // se registra en el servidor, no se expone
  res.status(500).json({ message: 'Error interno del servidor' });
};

module.exports = { notFound, errorHandler };
