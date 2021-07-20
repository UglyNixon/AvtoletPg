const Router = require('express');
const router = new Router();
const backupController = require('../controllers/backupController');


router.post('/',backupController.forceCreate)
router.get('/:id',backupController.getOne)
router.get('/',backupController.getAll)




module.exports=router