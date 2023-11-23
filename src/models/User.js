const { DataTypes } = require('sequelize')
const sequelize = require('../database/database')
const Status = require('./Status')

const User = sequelize.define('Users', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  fname: {
    type: DataTypes.STRING(25)
  },
  lname: {
    type: DataTypes.STRING(25)
  },
  email: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  id_status: {
    type: DataTypes.INTEGER
  }
}, {
  tableName: 'Users',
  indexes: [{ unique: true, fields: ['email'] }],
  defaultScope: {
    attributes: { exclude: ['password', 'id_status'] }
  }
})
User.belongsTo(Status, { foreignKey: 'id_status' })// Un usuario pertenece a un estado

module.exports = User
