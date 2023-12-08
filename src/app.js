require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')
const statusRoutes = require('./routes/status.routes')
const userRoutes = require('./routes/user.routes')
const morgan = require('morgan')

const app = express()
app.disable('x-powered-by')// Disable header X-Powered-By: Express

// Middlewares
app.use(express.json())

// Cookies
app.use(cookieParser())

// Morgan
app.use(morgan('dev'))

app.use('/api', statusRoutes)
app.use('/api', userRoutes)

module.exports = app
