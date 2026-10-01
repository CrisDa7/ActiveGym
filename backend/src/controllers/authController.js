const env = require('../config/env');
const authService = require('../services/authService');
const asyncHandler = require('../utils/asyncHandler');

// El token viaja en una cookie httpOnly: JavaScript del navegador NO puede leerla (protege contra XSS).
const cookieOptions = {
  httpOnly: true,
  secure: env.isProd || env.cookieSameSite === 'none',
  sameSite: env.cookieSameSite,
  maxAge: 8 * 60 * 60 * 1000,
  path: '/',
};

exports.login = asyncHandler(async (req, res) => {
  const { token, user } = await authService.login(req.body.correo, req.body.password);
  res.cookie('token', token, cookieOptions).json({ user });
});

exports.logout = (_req, res) => {
  res.clearCookie('token', { ...cookieOptions, maxAge: undefined }).json({ message: 'Sesión cerrada' });
};

exports.me = (req, res) => res.json({ user: req.user });
