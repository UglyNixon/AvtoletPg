const Router = require('express');

const router = new Router();
const workerPlaceController = require('../controllers/workerPlaceController');
const checkRoleMiddleWare = require('../middleware/checkRoleMiddleWare');

router.post('/',checkRoleMiddleWare("ADMIN"), workerPlaceController.create)
router.get('/',workerPlaceController.getAll)




module.exports=router