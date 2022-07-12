const Sequelize = require('sequelize');

const database = require('../db/index');

////////////////////////////////////////////////////////////

const Diary = database.define('diary', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  title: {
    type: String,
    allowNull: false,
  },
  date: {
    type: Date,
    allowNull: true,
    defaultValue: DataTypes.NOW
  },
  content: {
    type: String,
    allowNull: true,
  },
})

module.exports = Diary;
