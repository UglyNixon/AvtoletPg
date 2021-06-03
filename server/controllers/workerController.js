const {Worker} = require('../models/models');
const ApiError = require('../error/ApiError');
const uuid = require('uuid');
const path = require('path');



class workerController {

    async create (req,res,next){
        try {
            const {name,surname,code,wStatus} =req.body;
            const {img} = req.files;
            let fileName = uuid.v4()+'.jpeg';
            img.mv(path.resolve(__dirname,'..','static',fileName))
            const worker = await Worker.create({name,surname,code,wStatus: wStatus ,img:fileName})
            return res.json(worker)
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }
    async getAll(req,res,next) {
        const {code,wStatus} = req.query;
        
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
    async getOne(req,res) {
        const {id}=req.params;
        const worker = await Worker.findOne({
         where:{code:id}
        })
       return res.json(worker)
    }

}

module.exports=new workerController()