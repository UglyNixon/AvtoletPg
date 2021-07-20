const ApiError = require("../error/ApiError")
const { BackupTable, Ruchka } = require("../models/models")



class backupController {
    async forceCreate (req,res,next){

        try {
            const {id,tableName} =req.body
         
let work;
        switch (tableName) {
case 'Ручки' :
    let data = (await BackupTable.findOne ({where:{id}})).jsonData
    await Ruchka.destroy({
        truncate: true,
      })
    data.map(async (item) => {
await Ruchka.create({brak:item.brak,series:item.series,totalValue:item.totalValue,status:item.status,date:item.date,workerId:item.workerId,productId:item.productId})
    })
break;

case "Платы":

break;

case "Кодовые полоски":

break

default :
next(ApiError.internal('Такой таблицы не существует'))

        }
           
            return res.json(work);
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
       

    }
   
    async getOne(req,res,next) {
        try {
            const {id} = req.params
            
                const backup= await BackupTable.findOne({
                    where : {
                        id
                    }
                })
            return res.json(backup)

        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
            
    }
    async getAll(req,res,next) {
        try {
            let backup
           backup = await BackupTable.findAll()
            return res.json(backup)
            
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }

}
}

module.exports=new backupController()