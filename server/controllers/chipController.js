const {Chip, Defec} = require('../models/models');
const ApiError = require('../error/ApiError');





class chipController {
    async create (req,res,next){
       
    }
 
    async getAll(req,res) {
       res.json({series:21222})
    }
    async getOne(req,res) {
   
    }



}

module.exports=new chipController()