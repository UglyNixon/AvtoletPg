const {Product} = require('../models/models');
const uuid = require('uuid');
const path = require('path');
const ApiError = require('../error/ApiError');


class productController {

    async create(req,res) {
        const {title} =req.body;
        const {img} = req.files;
        let fileName = uuid.v4()+'.jpeg';
        img.mv(path.resolve(__dirname,'..','static',fileName))
        const product = await Product.create({title ,img:fileName})

        return res.json(product)
       
    }
    async getAll(req,res) {

    }
 

}

module.exports=new productController()