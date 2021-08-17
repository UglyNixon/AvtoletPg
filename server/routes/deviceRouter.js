const Router = require('express');
const router = new Router();
const deviceController = require('../controllers/deviceController');
const checkRoleMiddleWare = require('../middleware/checkRoleMiddleWare');

router.post('/',checkRoleMiddleWare("ADMIN"), deviceController.create)
router.get('/',deviceController.getAll)
router.get('/:id',deviceController.getOne)




module.exports=router