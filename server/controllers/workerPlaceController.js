const { WorkerPlace} = require('../models/models');
const ApiError = require('../error/ApiError');




class workerPlaceController {

    async create (req,res,next){
        try {
            const {title} =req.body;
            const workerPlace = await WorkerPlace.create({title})
            return res.json(workerPlace)
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }
    async getAll(req,res,next) {
        
        
        try {
           const {id} = req.query
           console.log(`id`,id)
           let  workerPlace;
            id?    workerPlace = await WorkerPlace.findAll({where:{id}}) : workerPlace = await WorkerPlace.findAll()
           
        
         return res.json(workerPlace)
            
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
        
    }
   
}

module.exports=new workerPlaceController()