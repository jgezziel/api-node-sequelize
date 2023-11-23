const express = require('express')
const statusRoutes = require('./routes/status.routes')
const userRoutes = require('./routes/user.routes')

const app = express()

// Middlewares
app.use(express.json())

app.use('/api', statusRoutes)
app.use('/api', userRoutes)

module.exports = app
