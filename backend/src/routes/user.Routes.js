const { Router } = require('express');
const router = Router();
const { validateToken } = require('../middlewares/validationMiddleware');
const { handleLogin, handleRegister, handleGetUser } = require('../controllers/auth.controller');

router.post('/login', handleLogin); // login
router.post('/createUser', handleRegister); // crear usuario
router.get('/perfil', validateToken, handleGetUser); // obtener usuario para mi perfil

module.exports = router;