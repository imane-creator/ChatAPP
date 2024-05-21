const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const ReponseClient = sequelize.define('ReponseClient', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  texte: {
    type: DataTypes.STRING,
    allowNull: false
  },
  note: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  questionId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  selection: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  sectionId : {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  quizId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = ReponseClient;