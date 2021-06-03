const Router = require('express');
const router = new Router();
const defecController = require('../controllers/defecController');
const checkRoleMiddleWare = require('../middleware/checkRoleMiddleWare');

router.post('/',checkRoleMiddleWare('ADMIN'),defecController.create)
router.get('/',defecController.getAll)



module.exports=router