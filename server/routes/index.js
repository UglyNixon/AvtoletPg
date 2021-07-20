const Router = require('express');
const router = new Router();
const defecRouter = require('./defecRouter');
const ruchkaRouter = require('./ruchkaRouter');
const userRouter = require('./userRouter');
const workerRouter = require('./workerRouter');
const productRouter = require('./productRouter');
 const workerPlaceRouter = require('./workerPlaceRouter');
 const backupRouter = require('./backupRouter');

router.use('/worker',workerRouter)
router.use('/ruchka',ruchkaRouter)
router.use('/defec',defecRouter)
router.use('/user',userRouter)
router.use('/product',productRouter)
router.use('/workerPlace',workerPlaceRouter)
router.use('/backup',backupRouter)




module.exports=router