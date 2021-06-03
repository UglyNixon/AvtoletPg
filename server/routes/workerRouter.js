const Router = require('express');

const router = new Router();
const workerController = require('../controllers/workerController');
const checkRoleMiddleWare = require('../middleware/checkRoleMiddleWare');

router.post('/',checkRoleMiddleWare("ADMIN"), workerController.create)
router.get('/',workerController.getAll)
router.get('/:id',workerController.getOne)



module.exports=router