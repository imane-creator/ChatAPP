
const Sequelize = require('sequelize');
const sequelize = require('../database');
const Entreprise = require('./entreprise');


const Quiz = sequelize.define('Quiz', {
    
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  
  
  entrepriseId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Entreprise,
      key: 'id'
    },} ,
  
      
  
  // Timestamps
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
});


module.exports = Quiz;