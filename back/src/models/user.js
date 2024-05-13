const Sequelize = require('sequelize')
const sequelize = require("../database");


const User = sequelize.define("User",{

  id:{ 
  
    type:Sequelize.INTEGER, 
    autoIncrement:true, 
    allowNull:false, 
    primaryKey:true
}, 


  fullName:{
    type:Sequelize.STRING ,
    allowNull :false,
  },
  
  email:{
    type:Sequelize.STRING ,
    allowNull :false,

  },

  password:{
    type:Sequelize.STRING ,
    allowNull :false,

  },
 
// Timestamps 
createdAt: Sequelize.DATE, 
updatedAt: Sequelize.DATE,

} ,
);


module.exports =User ;