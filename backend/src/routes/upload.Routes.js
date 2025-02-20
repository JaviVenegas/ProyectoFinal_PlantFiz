const { Router } = require('express');
const { uploader } = require('../middlewares/uploadMiddlewares');
const {
	uploadSingle,
	uploadMultiple,
	getPublicFile,
	getPrivateFile,
} = require('../controllers/upload.controller');

const router = Router();

router.post('/', uploader.single('file'), uploadSingle);    //  POST - Subir una imagen   file=nombre del formulario en el frontend
router.post('/multiple', uploader.array('files'), uploadMultiple);   //POst - Subir multiples imagenes

router.get('/public/:filename', getPublicFile);   //GET - Obtener un archivo(imagen)
router.get('/private/:filename', getPrivateFile);  // GET - Obtener  archivos(imagenes)

module.exports = router;
