const express = require('express')
const { getStatus, createStatus } = require('../controllers/status.controller')

const router = express.Router()

router.get('/status', getStatus)
router.post('/status', createStatus)

module.exports = router
