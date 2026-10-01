// Todo este módulo es EXCLUSIVO del administrador.
const router = require('express').Router();
const ctrl = require('../controllers/userController');
const validate = require('../middlewares/validate');
const { authenticate, authorize } = require('../middlewares/auth');
const { usuarioSchema, estadoUsuarioSchema } = require('../validators/schemas');

router.use(authenticate, authorize('administrador'));

router.get('/', ctrl.list);
router.post('/', validate(usuarioSchema), ctrl.create);
router.patch('/:id/estado', validate(estadoUsuarioSchema), ctrl.setActive);

module.exports = router;
