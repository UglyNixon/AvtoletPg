const {Defec} = require('../models/models');
const ApiError = require('../error/ApiError');
const { Sequelize } = require('../db');



class defecController {

    async create(req,res) {
        
    }
    async getAll(req,res) {
 return res.json('дефекты')
    }
    async getTypes(req,res){
        const {typeId} =req.params
        let defecTypes=[]
        await Defec.findAll({
            attributes: [Sequelize.fn('DISTINCT', Sequelize.col('title')) ,'title'],
            where:{productId:typeId}
        }).then(d=>d.forEach(d=>defecTypes.push(d.title)))
        return res.json(defecTypes)
    }
    async getStats(req,res) {
        const {typeId} = req.params
        let defecTypes=[]
        let defecStats=[]
        await Defec.findAll({
            attributes: [Sequelize.fn('DISTINCT', Sequelize.col('title')) ,'title'],
            where:{productId:typeId}
        }).then(d=>d.forEach(d=>defecTypes.push(d.title)))
        new Promise((res,rej)=>{
            defecTypes.forEach( async (dt,index)=>{
                await Defec.sum('value',{where:{title:dt}})
                .then( data=>{ defecStats.push({title:dt,value:data})})
                if (index===defecTypes.length-1) res()
            })
        }).then(()=> res.json(defecStats))
    }
 

}

module.exports=new defecController()