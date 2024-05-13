// entreprise.js
const Sequelize = require('sequelize');
const sequelize = require('../database');
const User = require('./user');

const Entreprise = sequelize.define('Entreprise', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  ICE: {
    type: Sequelize.STRING,
    allowNull: false
  },
  IF: {
    type: Sequelize.STRING,
    allowNull: false
  },
  LegalStatus: {
    type: Sequelize.STRING,
    allowNull: false
  },
  Sector: {
    type: Sequelize.STRING,
    allowNull: false
  },

  RC: {
    type: Sequelize.STRING,
    allowNull: false
  },
   Goals: {
    type: Sequelize.STRING,
    allowNull: false
  },

  adresse: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  // Timestamps
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
});


module.exports = Entreprise;