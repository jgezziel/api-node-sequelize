const validator = require('validator')
const bcrypt = require('bcrypt')
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
  },
  createUser: async (req, res) => {
    try {
      const { fname, lname, email, password } = req.body

      const errors = []

      const validateFname = validator.isAlpha(fname)
      const validateLname = validator.isAlpha(lname)
      const validateEmail = validator.isEmail(email)
      const validatePassword = validator.isStrongPassword(password, { minLength: 8, minLowercase: 1, minUppercase: 1, minSymbols: 1 })

      if (!validateFname) { errors.push('First name must contain only letters.') }
      if (!validateLname) { errors.push('Last name must contain only letters.') }
      if (!validateEmail) { errors.push('Email must be a valid email.') }
      if (!validatePassword) { errors.push('Password must be at least 8 characters long, contain at least 1 lowercase letter, 1 uppercase letter and 1 symbol.') }

      if (validateFname && validateLname && validateEmail && validatePassword) {
        const emailExist = await User.findOne({ where: { email } })
        if (emailExist) {
          return res.status(400).json({
            status: 'error',
            code: 400,
            message: 'Email already exists'
          })
        }

        bcrypt.hash(password, 10, async (err, hash) => {
          if (err) {
            return res.status(500).json({ message: err.message })
          }

          const newUser = await User.create({ fname, lname, email, password: hash })
          res.status(201).json({
            status: 'success',
            code: 201,
            message: 'User created',
            data: newUser
          })
        })
      } else {
        return res.status(400).json({
          status: 'error',
          code: 400,
          message: 'User data validation incorrect, please try again.',
          errors
        })
      }
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

}

module.exports = controller
