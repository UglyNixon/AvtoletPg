const { Defec, Device} = require('../models/models');
const ApiError = require('../error/ApiError');





class deviceController {
    async create (req,res,next){
       
       try {
           let {series,totalValue,type,typeCode,brak,defec} =req.body
         const device = await Device.create({series,totalValue,brak,type,typeCode})
    //    сделать нормальную проверку на массив брака + вообще на клиенте
         if (defec[1].value) {
            
            defec = JSON.parse(defec)
            defec.forEach(i =>
                Defec.create({
                    deviceId:device.id,
                    title:`${i.id}`,
                    value:i.value
                })
            )
        }
        res.json(series)
       } catch (error) {
        next(ApiError.badRequest(error.message))
       }
    }
 
    async getAll(req,res,next) {
             try {
                 let device =await Device.findAll({})
                 res.json(device)

             } catch (error) {
                next(ApiError.badRequest(error.message))
             }
    }
    async getOne(req,res) {
   
    }



}

module.exports=new deviceController()