const ApiError = require("../error/ApiError")
const { BackupTable, Ruchka } = require("../models/models")
const fs = require('fs');
const path = require('path');


class backupController {
     async saveBackup (req,res) {
            try {
                const author = req.user.login
                const {date,productId} =req.body
              
                let data = await Ruchka.findAll()
                BackupTable.create({author:author,date:date,productId:productId,jsonData:data})
                fs.writeFileSync(path.resolve(__dirname,'..','crutches','backup','tempUpload.txt'),JSON.stringify(data))
                res.json('done');
            } catch (error) {
                res.json('что-то пошло не так');

            }
  }
       async saveBackupFile(req,res){
 
    res.download(path.resolve(__dirname,'..','crutches','backup','tempUpload.txt'),'tempUpload.txt')
    
   ;
  
}

    async forceCreate (req,res,next){

        try {
            const {id,tableName} =req.body;
         

        switch (tableName) {
case 'Ручки' :
    let data = (await BackupTable.findOne ({where:{id}})).jsonData
    await Ruchka.destroy({
        truncate: true,
        cascade:true
      })
    data.map(async (item) => {
await Ruchka.create({brak:item.brak,series:item.series,dolg:item.dolg,totalValue:item.totalValue,status:item.status,date:item.date,workerId:item.workerId,productId:item.productId})
    })
break;

case "Платы":

break;

case "Кодовые полоски":

break

default :
next(ApiError.internal('Такой таблицы не существует'))

        }
           
            return res.json('forceRestore');
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
    async forceCreateUseFile(req,res,next) {
       
try {
    const {productId} =req.body
    const author = req.user.login
    const {file} =req.files
    let fileContent
    file.mv(path.resolve(__dirname,'..','crutches','backup','tempDownload.txt'),()=>{
         fileContent = fs.readFileSync(path.resolve(__dirname,'..','crutches','backup','tempDownload.txt'), "utf8");
         let date  = new Date()
         date = `${(date.getMonth()+1)<10?`0${date.getMonth()+1}`:`${date.getMonth()+1}`}/${date.getFullYear().toString().slice(2)}`
         BackupTable.create({author:author,date:date,productId:productId,jsonData:JSON.parse(fileContent)})
    res.json('done')
    })
    
   
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