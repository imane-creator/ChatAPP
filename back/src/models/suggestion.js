
const Sequelize = require('sequelize');
const sequelize = require('../database');

const Question =require('./question')

const Suggestion = sequelize.define('Suggestion', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  content: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  note:{
    type :Sequelize.FLOAT,
    allowNull: false,
  },
  questionId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Question,
      key: 'id'
    },
    
  },
  createdAt: Sequelize.DATE,
updatedAt: Sequelize.DATE,
});
 


module.exports = Suggestion;