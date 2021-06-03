const Router = require('express');
const router = new Router();
const defecRouter = require('./defecRouter');
const ruchkaRouter = require('./ruchkaRouter');
const userRouter = require('./userRouter');
const workerRouter = require('./workerRouter');
const productRouter = require('./productRouter');

router.use('/worker',productRouter)
router.use('/ruchka',ruchkaRouter)
router.use('/defec',defecRouter)
router.use('/user',userRouter)
router.use('/product',productRouter)



module.exports=router