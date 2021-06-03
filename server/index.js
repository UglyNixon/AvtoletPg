const express = require('express');
require('dotenv').config()

const sequelize = require('./db');
const models = require('./models/models')
const cors = require('cors');
const router = require('./routes/index');
const PORT = process.env.PORT||4000;
const errorMiddleware = require('./middleware/ErrorHandlingMiddleware');
const fileUpload = require('express-fileupload');
const path = require('path');

const app = express();
app.use(cors())
app.use(express.json())
app.use(fileUpload({}))
app.use(express.static(path.resolve(__dirname,'static')))
app.use('/api',router)




app.use(errorMiddleware)



const start = async()=>{
        try {
           await sequelize.authenticate();
           await sequelize.sync()
            app.listen(PORT,()=>console.log(`%%-- Server start on PORT:${PORT} --%%`))
        } catch (error) {
            
        }
}

start()