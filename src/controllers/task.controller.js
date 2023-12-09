const validator = require('validator')
const Task = require('../models/Task')

const controller = {
  readTasks: async (req, res) => {
    try {
      const tasks = await Task.findAll()

      if (tasks.length === 0) {
        return res.status(404).json({
          status: 'error',
          code: 404,
          message: 'Tasks not found'
        })
      }

      res.status(200).json({
        status: 'success',
        code: 200,
        message: 'Tasks found',
        data: tasks
      })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },
  readTaskId: async (req, res) => {
    try {
      const { id } = req.params
      const task = await Task.findByPk(id)
      if (!task) {
        return res.status(404).json({
          status: 'error',
          code: 404,
          message: 'Task id not found'
        })
      }

      res.status(200).json({
        status: 'success',
        code: 200,
        message: 'Task found',
        data: task
      })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },
  createTask: async (req, res) => {
    try {
      const { task, coverImage, done, id_status } = req.body

      const errors = []

      const validateTask = !validator.isEmpty(task)

      if (!validateTask) { errors.push('Task is required') }

      if (validateTask) {
        try {
          const idUser = req.user.sub
          const newTask = await Task.create({ task, coverImage, done, id_user: idUser, id_status })

          res.status(201).json({
            status: 'success',
            code: 201,
            message: 'Task created',
            data: newTask
          })
        } catch (error) {
          res.status(500).json({ message: error.message })
        }
      } else {
        return res.status(400).json({
          status: 'error',
          code: 400,
          message: 'Task data validation incorrect, please try again.',
          errors
        })
      }
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }
}
module.exports = controller
