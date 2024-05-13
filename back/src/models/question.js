// question.js
const Sequelize = require('sequelize');
const sequelize = require('../database');
const Section = require('./section');



const Question = sequelize.define('Question', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  texte:{
    type:Sequelize.STRING ,
    allowNull :false,

  },
  type: {
    type:Sequelize.STRING,
    allowNull: false, 
  
  
    } ,
    sectionId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: Section,
        key: 'id'
      },
      
  },
  // Timestamps
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
});
module.exports = Question;