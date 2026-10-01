/**
 * Permisos:
 *  - Entrenador y administrador: ver, registrar y enviar WhatsApp.
 *  - Solo administrador: editar y eliminar.
 */
const router = require('express').Router();
const ctrl = require('../controllers/inscripcionController');
const validate = require('../middlewares/validate');
const { authenticate, authorize } = require('../middlewares/auth');
const { inscripcionSchema } = require('../validators/schemas');

router.use(authenticate);

router.get('/areas', ctrl.areas);
router.get('/alertas', ctrl.alerts);
router.get('/', ctrl.list);
router.post('/', validate(inscripcionSchema), ctrl.create);
router.get('/:id/whatsapp', ctrl.whatsapp);

router.put('/:id', authorize('administrador'), validate(inscripcionSchema), ctrl.update);
router.delete('/:id', authorize('administrador'), ctrl.remove);

module.exports = router;
