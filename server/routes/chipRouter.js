const Router = require('express');
const router = new Router();
const chipController = require('../controllers/chipController');
const checkRoleMiddleWare = require('../middleware/checkRoleMiddleWare');

router.post('/',checkRoleMiddleWare("ADMIN"), chipController.create)
router.get('/',chipController.getAll)
router.get('/:id',chipController.getOne)




module.exports=router