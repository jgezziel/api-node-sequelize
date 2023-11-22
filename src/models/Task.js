const { DataTypes } = require('sequelize')
const sequelize = require('../database/database')
const User = require('./User')
const Status = require('./Status')

const Task = sequelize.define('Tasks', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  task: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  done: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  id_user: {
    type: DataTypes.INTEGER
  },
  id_status: {
    type: DataTypes.INTEGER
  }
}, {
  tableName: 'Tasks'
})

Task.belongsTo(User, { foreignKey: 'id_user', targetKey: 'id' })// Las tareas pertenecen a un usuario
User.hasMany(Task, { foreignKey: 'id_user', sourceKey: 'id' })// Un usuario tiene muchas tareas
Task.belongsTo(Status, { foreignKey: 'id_status' })// Las tareas pertenecen a un estado

module.exports = Task
