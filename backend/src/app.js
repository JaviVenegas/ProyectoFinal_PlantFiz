require('./docs/router/index.routes');

const swaggerUi = require('swagger-ui-express');
const { specs } = require('./docs/swaggerConfig');

const express = require('express');
const morgan = require('morgan');
const APIRoutes = require('./routes/routes');
const errorMiddleware = require('./middlewares/errorMiddleware');
const cors = require('cors')  //habilita la comunicacion entre distintas app o dominios diferentes

const app = express();



//Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(
    cors({
        origin: [ 
            process.env.NODE_ENV == 'production'
                ? 'https://proyectofinal-plantfiz.onrender.com'
                : 'http://localhost:5173/',
            ],
}));  

// Routes
app.use('/', APIRoutes)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Middleware de error
app.use(errorMiddleware)

module.exports = app

