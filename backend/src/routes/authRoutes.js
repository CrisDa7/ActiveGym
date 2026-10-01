const router = require('express').Router();
const rateLimit = require('express-rate-limit');
const ctrl = require('../controllers/authController');
const validate = require('../middlewares/validate');
const { authenticate } = require('../middlewares/auth');
const { loginSchema } = require('../validators/schemas');

// Anti fuerza bruta: máx. 10 intentos de login cada 15 minutos por IP
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Demasiados intentos. Intenta de nuevo en 15 minutos.' },
});

router.post('/login', loginLimiter, validate(loginSchema), ctrl.login);
router.post('/logout', ctrl.logout);
router.get('/me', authenticate, ctrl.me);

module.exports = router;
