const sequelize = require('../db');
const {DataTypes} = require('sequelize');

const Worker = sequelize.define('worker',
    {
        id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
        name:{type:DataTypes.STRING,unique:false,allowNull:false},
        surname:{type:DataTypes.STRING,unique:false,allowNull:false},
        code:{type:DataTypes.INTEGER,unique:true,allowNull:false},
        img:{type:DataTypes.STRING,defaultValue:'EmptyProfile.jpg'}

    },{
        timestamps: false
    }
)
const Ruchka = sequelize.define('ruchka',{
    id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    series:{type:DataTypes.INTEGER,unique:true,allowNull:false},
    totalValue:{type:DataTypes.INTEGER,unique:false,allowNull:false},
    dolg:{type:DataTypes.INTEGER,defaultValue:0},
    status:{type:DataTypes.BOOLEAN,defaultValue:false},
    date:{type:DataTypes.STRING,defaultValue:''},
    brak:{type:DataTypes.INTEGER,defaultValue:0}
},{
    timestamps: false,
  
})
const Chip = sequelize.define('chip',{
    id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    series:{type:DataTypes.INTEGER,allowNull:false},
    totalValue:{type:DataTypes.INTEGER,unique:false,allowNull:false},
    type:{type:DataTypes.STRING,allowNull:false},
    typeCode:{type:DataTypes.STRING,allowNull:false},
    brak:{type:DataTypes.INTEGER,defaultValue:0}
},{
    timestamps: false,
  
})

const Defec = sequelize.define('defec',{
    id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    title:{type:DataTypes.STRING,allowNull:false},
    value:{type:DataTypes.INTEGER,allowNull:false}
},{
    timestamps: false
})

const User  = sequelize.define('user',{
    id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    login:{type:DataTypes.STRING,unique:true,allowNull:false},
    password:{type:DataTypes.STRING,allowNull:false},
    role:{type:DataTypes.STRING,defalutValue:"USER"}
    
},
{
    timestamps: false
})

const Product = sequelize.define('product',{
    id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    title:{type:DataTypes.STRING,unique:true},
    img:{type:DataTypes.STRING,defaultValue:''}
},{
        timestamps: false
})

const WorkerPlace = sequelize.define('workerPlace',{
    id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    title:{type:DataTypes.STRING,unique:true},
},{
        timestamps: false
})
const BackupTable = sequelize.define ('backupTable',{
    id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    date :{type:DataTypes.STRING,allowNull:false},
    author :{type:DataTypes.STRING,defaultValue:'если не юзер то кот'},
    ServerDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    jsonData :{type:DataTypes.JSON,allowNull:false}
    
},{
    timestamps: false  
})

Product.hasMany(Ruchka);
Ruchka.belongsTo(Product);

Worker.hasMany(Ruchka);
Ruchka.belongsTo(Worker)

Ruchka.hasMany(Defec,{as:'defec'});
Defec.belongsTo(Ruchka)

Chip.hasMany(Defec,{as:'defec'});
Defec.belongsTo(Chip)

WorkerPlace.hasMany(Worker);
Worker.belongsTo(WorkerPlace);

Product.hasMany(BackupTable);
BackupTable.belongsTo(Product)

module.exports= {
    Worker,
    Ruchka,
    Defec,
    User,
    Product,
    WorkerPlace,
    BackupTable,
    Chip
}