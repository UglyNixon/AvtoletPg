const {Worker} = require('../models/models');
const ApiError = require('../error/ApiError');
const uuid = require('uuid');
const path = require('path');



class workerController {

    async create (req,res,next){
        try {
            const {name,surname,code,workerPlaceId} =req.body;
            try {
                const {img} = req.files;
                let fileName = uuid.v4()+'.jpeg';
                img.mv(path.resolve(__dirname,'..','static',fileName))
                const worker = await Worker.create({name,surname,code,workerPlaceId,img:fileName})
            }finally{
            const worker = await Worker.create({name,surname,code,workerPlaceId})
            return res.json(worker)
            }
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }
    async getAll(req,res,next) {

        
        try {
            const {code,wStatus} = req.query;
        let workers;
        if (!code&&!wStatus){
            workers = await Worker.findAll()
        }
        if (!code&&wStatus){
            workers = await Worker.findAll({where:{wStatus}})
        }
        if (code&&!wStatus){
            workers = await Worker.findAll({where:{code}})
        }
        if (code&&wStatus){
            workers = await Worker.findAll({where:{code,wStatus}})
        }
        return res.json(workers)
            
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
        
    }
    async getOne(req,res,next) {
   try {
   
    const {id}=req.params;
    console.log(id)
    const worker = await Worker.findOne({
     where:{id}
    })
    console.log('send')
     return res.json(worker)
   } catch (error) {
       next(ApiError.badRequest(error.message))
   }

        
       
       
    }
    async deleteWorker (req,res,next){
        try {
            const {id}=req.query
           await Worker.destroy({where:{id:id}})
            res.json('done')
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }

}

module.exports=new workerController()