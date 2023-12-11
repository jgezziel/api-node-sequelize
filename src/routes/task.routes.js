const express = require('express')
const TaskController = require('../controllers/task.controller')

const router = express.Router()
const mdJwt = require('../middleware/jwtAuth')

router.get('/tasks', TaskController.readTasks)
router.get('/task/:id', TaskController.readTaskId)
router.post('/task', mdJwt.auth, TaskController.createTask)
router.put('/task/:id', mdJwt.auth, TaskController.updateTask)
router.delete('/task/:id', mdJwt.auth, TaskController.deleteTask)
router.post('/task/upload', mdJwt.auth, TaskController.uploadImage)

module.exports = router
