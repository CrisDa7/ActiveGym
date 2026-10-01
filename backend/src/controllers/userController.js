const userService = require('../services/userService');
const asyncHandler = require('../utils/asyncHandler');

exports.list = asyncHandler(async (_req, res) => res.json(await userService.list()));

exports.create = asyncHandler(async (req, res) => res.status(201).json(await userService.create(req.body)));

exports.setActive = asyncHandler(async (req, res) =>
  res.json(await userService.setActive(Number(req.params.id), req.body.activo, req.user.id))
);
