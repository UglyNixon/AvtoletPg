const {Ruchka, Defec} = require('../models/models');
const ApiError = require('../error/ApiError');


class ruchkaController {
    async create (req,res,next){
        try {
            const {series,totalValue,dolg,brak,status,date,workerId,productId}=req.body;
            const ruchka = await Ruchka.create({series,totalValue,status,date,workerId,productId,dolg,brak})
            try {
                const {series,totalValue,status,date,workerId,productId} =req.body
                const ruchka = await Ruchka.create({series,totalValue,status,date,workerId,productId})
            }finally{
            
            return res.json(ruchka)
            }
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }

    async getAll(req,res) {
            let ruchki = await Ruchka.findAll()
            res.json(ruchki)
    }
    async getOne(req,res) {
   const {id} = req.params;
   let ruchka=
   await Ruchka.findOne({where:{series:id},
          include:[{model:Defec,as:'defec'}]})
          return res.json(ruchka)
    }
  

}

module.exports=new ruchkaController()