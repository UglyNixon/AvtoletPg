const ApiError = require('../error/ApiError');
const {User} = require('../models/models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const generateJwt = (id,login,role)=>{
  return jwt.sign({id,login,role},process.env.SECRET_KEY,{expiresIn:'24h'})

}

class UserController {

    async registration(req,res,next) {
      const {login,password,role} = req.body
      if (!login || ! password) {
        return next(ApiError.badRequest('некорректный логин или пароль'))
      }
      const candidate = await User.findOne({where:{login}})
      if (candidate) {
        return next(ApiError.badRequest('пользователь с таким именем уже зарегестрирован'))
      }
      const hashPassword = await bcrypt.hash(password,5);
      const user = await User.create({login,password:hashPassword,role})
      const token = generateJwt(user.id,user.login,user.role)
       return res.json({token})
    }
    async login(req,res,next) {

      const {login,password} = req.body;
      const user = await User.findOne({where:{login}})
      if (!user) {
        return next(ApiError.internal('пользователь не найден'))
      }
      let compratePassword = bcrypt.compareSync(password,user.password)
      if (!compratePassword) {
        return next(ApiError.badRequest('неверный пароль'))
      }
      const token = generateJwt(user.id,user.login,user.role)
      return res.json({token})

    }
    async check(req,res,next) {
  
      const token = generateJwt(req.user.id,req.user.login,req.user.role);
      return res.json({token})
       
    }

}

module.exports=new UserController()