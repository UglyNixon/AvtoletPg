const {Ruchka, Defec} = require('../models/models');
const ApiError = require('../error/ApiError');
const { Op } = require('sequelize')
const fs = require('fs');


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
    async forceCreate (req,res,next) {
        try {
            


            return res.json('done')
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
    async filter(req,res,next) {
                try {
                   let {dolg,brak,status,date,workerId}=req.query;
                  console.log(workerId)
                   let workerSearch = workerId == 'Все'? {[Op.ne]:0}:{[Op.eq]:workerId} 
                   let dolgSearch = dolg =='Все' ? {[Op.ne]:-1} : dolg == "Есть" ? {[Op.gt]:0} :{[Op.eq]:0} 
                   let brakSearch = brak == 'Все' ? {[Op.ne]:-1} : /99/.test(brak)? {[Op.between]:[1,99]} :{[Op.gt]:99}
                   let statusSearch =status =="Все" ? {[Op.or]:[true,false]} :/Сдано/.test(status) ? {[Op.eq]:true} :{[Op.not]:true}
                   /*с даной кривовато вышло .....так норм??*/
                    let dateSearch = date=='Все'? {[Op.ne]:'Какая разница что'}
                    :/2020/.test(date) ? 
                    {[Op.like]:'__/20'}
                    // {[Op.or]:['01/20','02/20','03/20','04/20','05/20','06/20','07/20','08/20','09/20','10/20','11/20','12/20',]}:
                    :
                    {[Op.like]:'__/21'}
                    // {[Op.or]:['01/21','02/21','03/21','04/21','05/21','06/21','07/21','08/21','09/21','10/21','11/21','12/21']}
               console.log(dolg,brak,status,date,workerId)
              
                    const ruchka = await Ruchka.findAll ({

                            where: {
                                [Op.and] :[
                                {workerId:workerSearch},
                                {dolg:dolgSearch},
                                {brak:brakSearch},
                                {status:statusSearch},
                                {date:dateSearch}
                                ]
                            }
                    })
                        return res.json(ruchka)
                } catch (error) {
                    next(ApiError.badRequest(error.message)) 
                }

    }
  

}

module.exports=new ruchkaController()