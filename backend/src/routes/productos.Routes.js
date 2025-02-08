const { Router } = require('express');
const router = Router();
const {handleGetAllPlantas, handleGetPlanta, handlePostPlanta, handleDeletePlanta, handleEditPlanta} = require('../controllers/plantas.controller');


router.get('/plantas', handleGetAllPlantas); //obtener todos los productos
router.get('/plantas/:id', handleGetPlanta); //obtener producto por id 
router.post('/planta', handlePostPlanta); //crear producto en admin 
router.patch('/plantas/:id', handleEditPlanta); //actualizar producto admin 
router.delete('/plantas/:id', handleDeletePlanta); //eliminar producto en admin 



module.exports = router;

