const {Ruchka, Defec} = require('../models/models');
const ApiError = require('../error/ApiError');


class ruchkaController {

    async create(req,res,next) {
        try {
        const {series,totalValue,workerId,defec,date}=req.body;
        const ruchka = await Ruchka.create({series,totalValue,workerId,productId,date})
        if (defec) {
    defec = JSON.parse(defec)
    defec.forEach(i=>
    Defec.create({
        title:i.title,
        value:i.value,
        ruchkaId:ruchka.id
    })
    )
    
        }
        return res.json(ruchka) 
        } catch (error) {
            return next(ApiError.badRequest(error.message))
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