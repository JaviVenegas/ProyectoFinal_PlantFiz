const { Router } = require('express');
const router = Router();
const {handleGetAllPlantas, handleGetPlanta, handlePostPlanta, handleDeletePlanta, handleEditPlanta} = require('../controllers/plantas.controller');


router.get('/plantas', handleGetAllPlantas); //obtener todos los productos
router.get('/planta/:id', handleGetPlanta); //obtener producto por id 
router.post('/planta', handlePostPlanta); //crear producto en admin 
router.patch('/planta/:id', handleEditPlanta); //actualizar producto admin 
router.delete('/planta/:id', handleDeletePlanta); //eliminar producto en admin 



module.exports = router;

