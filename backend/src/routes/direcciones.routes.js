const { Router } = require("express");
const router = Router();
const { validateToken } = require("../middlewares/validationMiddleware");
const {
    handleGetDirections,
    
} = require("../controllers/direcciones.controller");

// Rutas de direcciones
router.get("/", validateToken, handleGetDirections); // Obtener todas las direcciones de un usuario
// router.post("/", validateToken, handleAddUserAddress); // Añadir una dirección
// router.put("/:addressId", validateToken, handleUpdateUserAddress); // Actualizar una dirección específica
// router.delete("/:addressId", validateToken, handleDeleteUserAddress); // Eliminar una dirección específica

module.exports = router;
