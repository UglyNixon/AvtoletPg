const { WorkerPlace} = require('../models/models');
const ApiError = require('../error/ApiError');




class workerPlaceController {

    async create (req,res,next){
        try {
            const {title} =req.body;
            const workerPlace = await WorkerPlace.create({title})
            return res.json(workerPlcae)
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }
    async getAll(req,res,next) {
        
        
        try {
           
        let workerPlace;
        
            workerPlace = await WorkerPlace.findAll()
        
        return res.json(workerPlace)
            
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
        
    }
   
}

module.exports=new workerPlaceController()