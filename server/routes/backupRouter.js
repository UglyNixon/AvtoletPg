const Router = require('express');
const router = new Router();
const backupController = require('../controllers/backupController');
const checkRoleMiddleWare = require('../middleware/checkRoleMiddleWare');


router.post('/',checkRoleMiddleWare('ADMIN'),backupController.forceCreate)
router.post('/useFile',checkRoleMiddleWare('ADMIN'),backupController.forceCreateUseFile)
router.get('/saveFile',backupController.saveBackupFile)
router.post('/save',checkRoleMiddleWare('ADMIN'),backupController.saveBackup)
router.get('/:id',backupController.getOne)
router.get('/',backupController.getAll)




module.exports=router