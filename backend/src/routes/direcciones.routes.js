const { Router } = require("express");
const router = Router();
const { validateToken } = require("../middlewares/validationMiddleware");
const {
    handleGetDirections,
    handleCreateDirection,
    handleUpdateDirection,
    handleDeleteDirection
    
} = require("../controllers/direcciones.controller");

// Rutas de direcciones
router.get("/", validateToken, handleGetDirections); // Obtener todas las direcciones de un usuario
router.post("/createDirection", validateToken, handleCreateDirection); // Añadir una dirección
router.put("/updateDirection/:id", validateToken, handleUpdateDirection); // Actualizar una dirección específica
router.delete("/deleteDirection/:id", validateToken, handleDeleteDirection); // Eliminar una dirección específica

module.exports = router;
