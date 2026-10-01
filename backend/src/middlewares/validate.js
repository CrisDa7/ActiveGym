/** Middleware de validación: reemplaza req.body por los datos ya limpios y tipados. */
const AppError = require('../utils/AppError');

module.exports = (schema) => (req, _res, next) => {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    const msg = result.error.issues.map((i) => i.message).join('. ');
    return next(new AppError(msg, 422));
  }
  req.body = result.data;
  next();
};
