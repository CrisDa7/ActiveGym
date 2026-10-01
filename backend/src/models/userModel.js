/** Modelo de usuarios: acceso a datos únicamente (sin reglas de negocio). */
const db = require('../config/db');

const PUBLIC_FIELDS = 'id, nombre, apellido, celular, correo, rol, activo, creado_en';

const userModel = {
  async findByEmail(correo) {
    const { rows } = await db.query('SELECT * FROM usuarios WHERE correo = $1', [correo.toLowerCase()]);
    return rows[0] || null;
  },

  async findById(id) {
    const { rows } = await db.query(`SELECT ${PUBLIC_FIELDS} FROM usuarios WHERE id = $1`, [id]);
    return rows[0] || null;
  },

  async list() {
    const { rows } = await db.query(`SELECT ${PUBLIC_FIELDS} FROM usuarios ORDER BY creado_en DESC`);
    return rows;
  },

  async create({ nombre, apellido, celular, correo, passwordHash, rol }) {
    const { rows } = await db.query(
      `INSERT INTO usuarios (nombre, apellido, celular, correo, password_hash, rol)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING ${PUBLIC_FIELDS}`,
      [nombre, apellido, celular, correo.toLowerCase(), passwordHash, rol]
    );
    return rows[0];
  },

  async setActive(id, activo) {
    const { rows } = await db.query(
      `UPDATE usuarios SET activo = $2 WHERE id = $1 RETURNING ${PUBLIC_FIELDS}`,
      [id, activo]
    );
    return rows[0] || null;
  },
};

module.exports = userModel;
