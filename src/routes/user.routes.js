const express = require('express')
const UserController = require('../controllers/user.controller')

const router = express.Router()

router.get('/users', UserController.readUsers)
router.get('/user/:id', UserController.readUserById)
router.post('/user', UserController.createUser)

module.exports = router
