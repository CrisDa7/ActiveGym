/** Reglas de negocio de usuarios (solo el administrador las usa). */
const bcrypt = require('bcryptjs');
const userModel = require('../models/userModel');
const AppError = require('../utils/AppError');

module.exports = {
  list: () => userModel.list(),

  async create(data) {
    const passwordHash = await bcrypt.hash(data.password, 12);
    return userModel.create({ ...data, passwordHash });
  },

  async setActive(id, activo, currentUserId) {
    if (id === currentUserId) throw new AppError('No puedes desactivar tu propia cuenta', 400);
    const user = await userModel.setActive(id, activo);
    if (!user) throw new AppError('Usuario no encontrado', 404);
    return user;
  },
};
