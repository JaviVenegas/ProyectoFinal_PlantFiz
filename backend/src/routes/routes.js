const express = require('express');
const authRoutes = require('./auth.routes');
const productosRoutes = require('./productos.Routes'); 

const router = express.Router();

const app = express();

//middlewares (app para ejecutar el payload del usuario en este caso crear producto o un usuario)
app.use('/auth', authRoutes);  
app.use('/productos', productosRoutes);  

module.exports = app;