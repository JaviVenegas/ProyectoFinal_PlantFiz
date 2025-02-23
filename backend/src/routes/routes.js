const express = require('express');
const userRoutes = require('./user.Routes');        //user 
const productosRoutes = require('./productos.Routes');  //productos
const uploadRoutes = require('./upload.Routes');    //uploads 

const router = express.Router();

const app = express();

//middlewares (app para ejecutar el payload del usuario en este caso crear producto o un usuario)
app.use('/user', userRoutes);  
app.use('/productos', productosRoutes); 
app.use('/uploads', uploadRoutes);     

module.exports = app;