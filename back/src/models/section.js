// entreprise.js
const Sequelize = require('sequelize');
const sequelize = require('../database');
const Quiz = require('./quiz');

const Section = sequelize.define(' Section ', {
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
  title:{
    type:Sequelize.STRING ,
    allowNull :false,

  },
  
  quizId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Quiz,
      key: 'id'
    },
    
  },
      
  
  // Timestamps
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
});


module.exports = Section;