/** Lógica de autenticación: verificar credenciales y firmar tokens. */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const env = require('../config/env');
const userModel = require('../models/userModel');
const AppError = require('../utils/AppError');

// Hash falso para comparar aunque el correo no exista (evita "timing attacks")
const DUMMY_HASH = bcrypt.hashSync('dummy-password', 12);

const authService = {
  async login(correo, password) {
    const user = await userModel.findByEmail(correo);
    const ok = await bcrypt.compare(password, user ? user.password_hash : DUMMY_HASH);
    // Mensaje genérico: no revela si el correo existe o no
    if (!user || !ok || !user.activo) throw new AppError('Correo o contraseña incorrectos', 401);

    const token = jwt.sign({ sub: user.id, rol: user.rol }, env.jwtSecret, {
      algorithm: 'HS256',
      expiresIn: env.jwtExpiresIn,
    });
    const { password_hash, ...publicUser } = user;
    return { token, user: publicUser };
  },
};

module.exports = authService;
