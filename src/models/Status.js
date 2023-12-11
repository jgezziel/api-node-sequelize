const { DataTypes } = require('sequelize')
const sequelize = require('../database/database')

const Status = sequelize.define('status', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  description: {
    type: DataTypes.STRING(25)
  }
}, {
  tableName: 'Status'
})

module.exports = Status
