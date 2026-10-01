/**
 * Autenticación y autorización.
 *  - authenticate: verifica el JWT de la cookie httpOnly y carga al usuario desde la BD
 *    (así, si desactivas un usuario, pierde acceso de inmediato).
 *  - authorize: restringe una ruta a ciertos roles (control de acceso por rol).
 */
const jwt = require('jsonwebtoken');
const env = require('../config/env');
const userModel = require('../models/userModel');
const AppError = require('../utils/AppError');
const asyncHandler = require('../utils/asyncHandler');

const authenticate = asyncHandler(async (req, _res, next) => {
  const token = req.cookies?.token;
  if (!token) throw new AppError('No autenticado', 401);

  let payload;
  try {
    payload = jwt.verify(token, env.jwtSecret, { algorithms: ['HS256'] });
  } catch {
    throw new AppError('Sesión inválida o expirada', 401);
  }

  const user = await userModel.findById(payload.sub);
  if (!user || !user.activo) throw new AppError('Usuario no autorizado', 401);

  req.user = user;
  next();
});

const authorize = (...roles) => (req, _res, next) => {
  if (!req.user || !roles.includes(req.user.rol)) {
    return next(new AppError('No tienes permisos para esta acción', 403));
  }
  next();
};

module.exports = { authenticate, authorize };
