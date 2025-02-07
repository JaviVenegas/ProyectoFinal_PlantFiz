const { Router } = require('express');
const router = Router();
const { validateToken } = require('../middlewares/validationMiddleware');
const { handleLogin, handleRegister, handleGetUser, handleUpdateUser, handleChangePassword } = require('../controllers/auth.controller');

router.post('/createUser', handleRegister); // crear usuario 
router.post('/login', handleLogin); // login
router.get('/perfil', validateToken, handleGetUser); // obtener usuario para mi perfil
router.put('/updateUser', validateToken, handleUpdateUser); // actualizar usuario
router.put('/changePassword', validateToken, handleChangePassword); // actualizar contraseña de usuario

module.exports = router;