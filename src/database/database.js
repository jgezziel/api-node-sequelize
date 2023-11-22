const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('todo_list', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
})

module.exports = sequelize
