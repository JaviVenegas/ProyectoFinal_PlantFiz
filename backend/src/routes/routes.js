const express = require('express');
const userRoutes = require('./user.routes');

const app = express();

app.use('/user', userRoutes);

module.exports = app;