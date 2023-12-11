const express = require('express')
const StatusController = require('../controllers/status.controller')

const router = express.Router()

router.get('/status', StatusController.readStatus)
router.get('/status/:id', StatusController.readStatusById)
router.post('/status', StatusController.createStatus)
router.put('/status/:id', StatusController.updateStatus)
router.delete('/status/:id', StatusController.deleteStatus)

module.exports = router
