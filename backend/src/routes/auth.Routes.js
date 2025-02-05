const { Router } = require('express');
const router = Router();
const { validateToken } = require('../middlewares/validationMiddleware');
const { handleLogin, handleRegister, handleGetUser } = require('../controllers/auth.controller');

router.post('/login', handleLogin);
router.post('/usuarios', handleRegister);
router.get('/usuarios', validateToken, handleGetUser);

module.exports = router;