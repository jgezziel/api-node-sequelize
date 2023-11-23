const validator = require('validator')
const User = require('../models/User')
const Status = require('../models/Status')

const controller = {
  readUsers: async (req, res) => {
    try {
      const users = await User.findAll({ include: [{ model: Status, attributes: { exclude: ['id'] } }] })

      if (users.length === 0) {
        return res.status(404).json({
          status: 'error',
          code: 404,
          message: 'Users not found'
        })
      }

      res.status(200).json({
        status: 'success',
        code: 200,
        message: 'Users found',
        data: users
      })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },
  readUserById: async (req, res) => {
    try {
      const { id } = req.params
      const user = await User.findByPk(id)
      if (!user) {
        return res.status(404).json({
          status: 'error',
          code: 404,
          message: 'User id not found'
        })
      }

      res.status(200).json({
        status: 'success',
        code: 200,
        message: 'User found',
        data: user
      })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }
}

module.exports = controller
