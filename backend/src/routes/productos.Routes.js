const { Router } = require('express');
const router = Router();


router.get('/productos', handleGetProductos); //obtener todos los productos
router.get('/productos/{id}', handleGetProducto); //obtener producto por id 
router.post('/productos', handleCreateProducto); //crear producto
router.put('/productos/{id}', handleUpdateProducto); //actualizar producto
router.delete('/productos/{id}', handleDeleteProducto); //eliminar producto



module.exports = router;