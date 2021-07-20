const Router = require('express');
const router = new Router();
const productController = require('../controllers/productController');
const checkRoleMiddleWare = require('../middleware/checkRoleMiddleWare');

router.post('/',productController.create)
router.get('/',productController.getAll)




module.exports=router