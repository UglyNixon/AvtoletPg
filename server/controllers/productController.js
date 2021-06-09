const {Product} = require('../models/models');
const uuid = require('uuid');
const path = require('path');
const ApiError = require('../error/ApiError');


class productController {

    async create(req,res,next) {
        const {title} =req.body;
        try {
            const {img} = req.files;
        let fileName = uuid.v4()+'.jpeg';
        img.mv(path.resolve(__dirname,'..','static',fileName))
        const product = await Product.create({title ,img:fileName})

        return res.json(product)
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }finally {
            const product = await Product.create({title})
            return res.json(product)
        }
       
       
    }
    async getAll(req,res) {
        try {
        const {id,title} = req.query;
        let products;
        if (!id&&!title){
            products = await Product.findAll()
        }
        return res.json(products)
            
    } catch (error) {
        next(ApiError.badRequest(error.message))
    }


    }
 

}

module.exports=new productController()