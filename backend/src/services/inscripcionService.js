/** Reglas de negocio de inscripciones: cálculo de la fecha de fin y alertas. */
const { addMonths, format, parseISO, isValid } = require('date-fns');
const env = require('../config/env');
const inscripcionModel = require('../models/inscripcionModel');
const areaModel = require('../models/areaModel');
const whatsappService = require('./whatsappService');
const AppError = require('../utils/AppError');

/** Una mensualidad dura EXACTAMENTE un mes: 15/03 → 15/04. */
function calcularFechaFin(fechaInicioISO) {
  const inicio = parseISO(fechaInicioISO);
  if (!isValid(inicio)) throw new AppError('Fecha de inicio inválida', 422);
  return format(addMonths(inicio, 1), 'yyyy-MM-dd');
}

/** Convierte el body validado al formato que espera el modelo. */
function toModelData(body) {
  return { ...body, fechaFin: calcularFechaFin(body.fechaInicio) };
}

const inscripcionService = {
  listAreas: () => areaModel.list(),

  list: (filters) => inscripcionModel.list(filters),

  async create(body, userId) {
    return inscripcionModel.create({ ...toModelData(body), registradoPor: userId });
  },

  async update(id, body) {
    const updated = await inscripcionModel.update(id, toModelData(body));
    if (!updated) throw new AppError('Inscripción no encontrada', 404);
    return updated;
  },

  async remove(id) {
    const ok = await inscripcionModel.remove(id);
    if (!ok) throw new AppError('Inscripción no encontrada', 404);
  },

  /** Alertas: mensualidades que vencen en ALERT_DAYS_BEFORE días o menos (y vencidas recientes). */
  async alerts() {
    const rows = await inscripcionModel.findExpiring(env.alertDaysBefore);
    return rows.map((r) => ({ ...r, whatsapp: whatsappService.buildReminder(r) }));
  },

  async whatsappLink(id, tipo = 'bienvenida') {
    const i = await inscripcionModel.findById(id);
    if (!i) throw new AppError('Inscripción no encontrada', 404);
    return tipo === 'recordatorio' ? whatsappService.buildReminder(i) : whatsappService.buildWelcome(i);
  },
};

module.exports = inscripcionService;
