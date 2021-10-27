const Router = require('express');
const router = new Router();
const defecController = require('../controllers/defecController');
const checkRoleMiddleWare = require('../middleware/checkRoleMiddleWare');

router.post('/',checkRoleMiddleWare('ADMIN'),defecController.create)
router.get('/',defecController.getAll)
router.get('/:typeId',defecController.getTypes)
router.get('/stats/:typeId',defecController.getStats)



module.exports=router