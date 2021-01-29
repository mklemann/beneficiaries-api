const { Router } = require('restify-router');
const controllers = require('../controllers/beneficiary.controller');

const router = new Router();

router.post('/create', controllers.post);
router.get('/', controllers.get);
router.get('/:id', controllers.getById);
router.put('/:id', controllers.update);
router.del('/:id', controllers.delete);

module.exports = router;
