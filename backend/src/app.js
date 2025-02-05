const express = require('express')
const morgan = require('morgan')
const APIRoutes = require('./routes/routes')
const errorMiddleware = require('./middlewares/errorMiddleware')
const cors = require('cors')

const app = express()

//Middlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(cors())

// Routes
app.use('/', APIRoutes)

// Middleware de error
app.use(errorMiddleware)

module.exports = app