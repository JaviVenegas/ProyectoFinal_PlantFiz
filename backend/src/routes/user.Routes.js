const { Router } = require('express');
const router = Router();
const { validateToken } = require('../middlewares/validationMiddleware');
const { handleLogin, handleRegister, handleGetUser, handleUpdateUser, handleChangePassword, handleDeleteUser } = require('../controllers/auth.controller');
const addressRoutes = require("./direcciones.routes");

// Rutas de usuario
router.post("/createUser", handleRegister); // Crear usuario
router.post("/login", handleLogin); // Iniciar sesión
router.get("/perfil", validateToken, handleGetUser); // Obtener perfil
router.put("/updateUser", validateToken, handleUpdateUser); // Actualizar usuario
router.put("/changePassword", validateToken, handleChangePassword); // Cambiar contraseña
router.delete("/deleteUser", validateToken, handleDeleteUser); // Eliminar usuario

// Subrutas de direcciones
router.use("/directions", validateToken, addressRoutes);

module.exports = router;