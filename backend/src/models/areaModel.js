const db = require('../config/db');

module.exports = {
  async list() {
    const { rows } = await db.query('SELECT id, nombre FROM areas ORDER BY id');
    return rows;
  },
};
