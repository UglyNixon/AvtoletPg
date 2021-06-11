const Router = require('express');
const router = new Router();
const ruchkaController = require('../controllers/ruchkaController');
const checkRoleMiddleWare = require('../middleware/checkRoleMiddleWare');

router.post('/',checkRoleMiddleWare("ADMIN"), ruchkaController.create)
router.get('/',ruchkaController.getAll)
router.get('/f',ruchkaController.filter)



module.exports=router