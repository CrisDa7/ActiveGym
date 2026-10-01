/**
 * Modelo de inscripciones (cliente + mensualidad).
 * "dias_restantes" se calcula en SQL usando la fecha de HOY en la zona horaria del gimnasio.
 */
const db = require('../config/db');
const env = require('../config/env');

// Consulta base reutilizable: une el nombre del área y calcula los días restantes.
const BASE_SELECT = `
  SELECT i.id, i.area_id, a.nombre AS area, i.nombre, i.apellido, i.telefono,
         i.peso, i.pago, i.modo_pago, i.fecha_inicio, i.fecha_fin,
         (i.fecha_fin - (NOW() AT TIME ZONE $1)::date) AS dias_restantes
  FROM inscripciones i
  JOIN areas a ON a.id = i.area_id`;

const inscripcionModel = {
  /** Lista con filtros opcionales: área y búsqueda por nombre/apellido/teléfono. */
  async list({ areaId, search } = {}) {
    const params = [env.timezone];
    const where = [];
    if (areaId) {
      params.push(areaId);
      where.push(`i.area_id = $${params.length}`);
    }
    if (search) {
      params.push(`%${search}%`);
      where.push(`(i.nombre ILIKE $${params.length} OR i.apellido ILIKE $${params.length} OR i.telefono ILIKE $${params.length})`);
    }
    const sql = `${BASE_SELECT} ${where.length ? 'WHERE ' + where.join(' AND ') : ''} ORDER BY i.fecha_fin ASC, i.id DESC LIMIT 500`;
    const { rows } = await db.query(sql, params);
    return rows;
  },

  async findById(id) {
    const { rows } = await db.query(`${BASE_SELECT} WHERE i.id = $2`, [env.timezone, id]);
    return rows[0] || null;
  },

  /** Mensualidades por vencer (<= N días) o vencidas hace poco (hasta 30 días). */
  async findExpiring(days) {
    const { rows } = await db.query(
      `SELECT * FROM (${BASE_SELECT}) t
       WHERE t.dias_restantes <= $2 AND t.dias_restantes >= -30
       ORDER BY t.dias_restantes ASC`,
      [env.timezone, days]
    );
    return rows;
  },

  async create(d) {
    const { rows } = await db.query(
      `INSERT INTO inscripciones
        (area_id, nombre, apellido, telefono, peso, pago, modo_pago, fecha_inicio, fecha_fin, registrado_por)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING id`,
      [d.areaId, d.nombre, d.apellido, d.telefono, d.peso, d.pago, d.modoPago, d.fechaInicio, d.fechaFin, d.registradoPor]
    );
    return this.findById(rows[0].id);
  },

  async update(id, d) {
    const { rowCount } = await db.query(
      `UPDATE inscripciones SET area_id=$2, nombre=$3, apellido=$4, telefono=$5, peso=$6,
              pago=$7, modo_pago=$8, fecha_inicio=$9, fecha_fin=$10
       WHERE id=$1`,
      [id, d.areaId, d.nombre, d.apellido, d.telefono, d.peso, d.pago, d.modoPago, d.fechaInicio, d.fechaFin]
    );
    return rowCount ? this.findById(id) : null;
  },

  async remove(id) {
    const { rowCount } = await db.query('DELETE FROM inscripciones WHERE id = $1', [id]);
    return rowCount > 0;
  },
};

module.exports = inscripcionModel;
