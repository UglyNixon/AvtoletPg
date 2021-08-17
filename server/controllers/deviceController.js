const { Defec} = require('../models/models');
const ApiError = require('../error/ApiError');





class deviceController {
    async create (req,res,next){
       
    }
 
    async getAll(req,res) {
            res.json({series:123412431})
    }
    async getOne(req,res) {
   
    }



}

module.exports=new deviceController()