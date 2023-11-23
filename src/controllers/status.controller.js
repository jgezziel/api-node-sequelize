const validator = require('validator')
const Status = require('../models/Status')

const controller = {
  readStatus: async (req, res) => {
    try {
      const status = await Status.findAll()
      if (status.length === 0) {
        return res.status(404).json({
          status: 'error',
          code: 404,
          message: 'Status not found'
        })
      }

      res.status(200).json({
        status: 'success',
        code: 200,
        message: 'Status found',
        data: status
      })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },
  readStatusById: async (req, res) => {
    try {
      const { id } = req.params
      const status = await Status.findByPk(id)
      if (!status) {
        return res.status(404).json({
          status: 'error',
          code: 404,
          message: 'Status id not found'
        })
      }

      res.status(200).json({
        status: 'success',
        code: 200,
        message: 'Status found',
        data: status
      })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },
  createStatus: async (req, res) => {
    try {
      const { description } = req.body

      const validateDescription = !validator.isEmpty(description, { ignore_whitespace: true })

      if (validateDescription) {
        const newStatus = await Status.create({ description })
        res.status(201).json({
          status: 'success',
          code: 201,
          message: 'Status created',
          data: newStatus
        })
      } else {
        return res.status(200).json({
          status: 'error',
          code: 200,
          message: 'Status data validation incorrect, please try again.'
        })
      }
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },
  updateStatus: async (req, res) => {
    try {
      const { id } = req.params
      const { description } = req.body
      if (!description) {
        return res.status(400).json({
          status: 'error',
          code: 400,
          message: 'Data is not complete'
        })
      }

      const status = await Status.findByPk(id)
      if (!status) {
        return res.status(404).json({
          status: 'error',
          code: 404,
          message: 'Status id not found'
        })
      }

      await status.update({ description })
      res.status(200).json({
        status: 'success',
        code: 200,
        message: 'Status updated',
        data: status
      })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },
  deleteStatus: async (req, res) => {
    try {
      const { id } = req.params
      const status = await Status.findByPk(id)
      if (!status) {
        return res.status(404).json({
          status: 'error',
          code: 404,
          message: 'Status id not found'
        })
      }

      await status.destroy()
      res.status(200).json({
        status: 'success',
        code: 200,
        message: 'Status deleted',
        data: status
      })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }
}

module.exports = controller
