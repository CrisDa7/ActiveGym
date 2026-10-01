const router = require('express').Router();

router.get('/health', (_req, res) => res.json({ status: 'ok' }));
router.use('/auth', require('./authRoutes'));
router.use('/usuarios', require('./userRoutes'));
router.use('/inscripciones', require('./inscripcionRoutes'));

module.exports = router;
