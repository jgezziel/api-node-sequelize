const Status = require('../models/Status')

const getStatus = async (req, res) => {
  try {
    const status = await Status.findAll()
    res.json(status)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
const createStatus = async (req, res) => {
  try {
    const { description } = req.body
    const newStatus = await Status.create({ description })
    res.json(newStatus)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = {
  getStatus,
  createStatus
}
