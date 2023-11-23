const express = require('express')
const statusRoutes = require('./routes/status.routes')

const app = express()

// Middlewares
app.use(express.json())

app.use('/api', statusRoutes)

module.exports = app
