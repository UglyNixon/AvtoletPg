const Router = require('express');
const router = new Router();
const backupController = require('../controllers/backupController');
const checkRoleMiddleWare = require('../middleware/checkRoleMiddleWare');


router.post('/',checkRoleMiddleWare('ADMIN'),backupController.forceCreate)
router.get('/:id',backupController.getOne)
router.get('/',backupController.getAll)
router.get('/save',backupController.saveBackup)




module.exports=router