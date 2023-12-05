const express = require('express')
const UserController = require('../controllers/user.controller')

const router = express.Router()
const mdJwt = require('../middleware/jwtAuth')

router.get('/users', UserController.readUsers)
router.get('/user/:id', UserController.readUserById)
router.post('/user', UserController.createUser)
router.put('/user/:id', mdJwt.auth, UserController.updateUser)
// router.delete('/user/:id', UserController.deleteUser)
router.post('/login', UserController.loginUser)

module.exports = router
