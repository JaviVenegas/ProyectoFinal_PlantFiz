const express = require('express');
const userRoutes = require('./user.Routes');
const productosRoutes = require('./productos.Routes');
const uploadRoutes = require('./upload.Routes'); 

const router = express.Router();

const app = express();

//middlewares (app para ejecutar el payload del usuario en este caso crear producto o un usuario)
app.use('/user', userRoutes);  
app.use('/productos', productosRoutes); 
app.use('/uploads', uploadRoutes);

module.exports = app;