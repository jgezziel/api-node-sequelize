const { DataTypes } = require('sequelize')
const sequelize = require('../database/database')
const User = require('./User')
const Status = require('./Status')

const Task = sequelize.define('tasks', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  task: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  coverImage: {
    type: DataTypes.STRING(200)
  },
  done: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  id_user: {
    type: DataTypes.INTEGER,
    allowNull: false
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
