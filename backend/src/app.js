require('./docs/router/index.routes');

const swaggerUi = require('swagger-ui-express');
const { specs } = require('./docs/swaggerConfig');

const express = require('express');
const morgan = require('morgan');
const APIRoutes = require('./routes/routes');
const errorMiddleware = require('./middlewares/errorMiddleware');
const cors = require('cors') 

const app = express();


//Middlewares
app.use(morgan('dev'));
app.use(express.json());

const allowedOrigins = [
    'http://localhost:5173',  // Desarrollo
    'https://proyectofinal-plantfiz.onrender.com'  // Producción
];

app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error('CORS no permitido para este origen'));
            }
        },
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true
    })
);

// Routes
app.use('/', APIRoutes)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Middleware de error
app.use(errorMiddleware)

module.exports = app

