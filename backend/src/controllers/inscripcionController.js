const service = require('../services/inscripcionService');
const asyncHandler = require('../utils/asyncHandler');
const AppError = require('../utils/AppError');

// Convierte :id de la URL a número y rechaza valores raros
const parseId = (req) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) throw new AppError('ID inválido', 400);
  return id;
};

exports.areas = asyncHandler(async (_req, res) => res.json(await service.listAreas()));

exports.list = asyncHandler(async (req, res) => {
  const areaId = req.query.areaId ? Number(req.query.areaId) : undefined;
  const search = typeof req.query.q === 'string' ? req.query.q.trim().slice(0, 60) : undefined;
  res.json(await service.list({ areaId: Number.isInteger(areaId) ? areaId : undefined, search }));
});

exports.alerts = asyncHandler(async (_req, res) => res.json(await service.alerts()));

exports.create = asyncHandler(async (req, res) =>
  res.status(201).json(await service.create(req.body, req.user.id))
);

exports.update = asyncHandler(async (req, res) => res.json(await service.update(parseId(req), req.body)));

exports.remove = asyncHandler(async (req, res) => {
  await service.remove(parseId(req));
  res.status(204).end();
});

exports.whatsapp = asyncHandler(async (req, res) => {
  const tipo = req.query.tipo === 'recordatorio' ? 'recordatorio' : 'bienvenida';
  res.json(await service.whatsappLink(parseId(req), tipo));
});
