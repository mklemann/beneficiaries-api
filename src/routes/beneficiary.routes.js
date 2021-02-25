const { Router } = require('restify-router');
const controllers = require('../controllers/beneficiary.controller');

const router = new Router();

router.post('/beneficiaries', controllers.post);
router.get('/beneficiaries', controllers.get);
router.get('/beneficiaries/:id', controllers.getById);
router.put('/beneficiaries/:id', controllers.update);
router.del('/beneficiaries/:id', controllers.delete);

module.exports = router;
