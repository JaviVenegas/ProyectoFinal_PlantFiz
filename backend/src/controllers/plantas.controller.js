const bcrypt = require('bcrypt');
const plantas= require('../models/plantas');


//Obtener todos los productos
const handleGetAllPlantas = async (req, res, next) => {
    try {
        const ListadoPlantas = await plantas.obtenerPlantas();
        res.json({
            message: 'Plantas obtenidas correctamente',
            data: ListadoPlantas
        });
    } catch (error) {
        next(error);
    }
}

//Obtener un producto por id con GET
const handleGetPlanta = async (req, res, next) => {
    try {
        const { id } = req.params;
        const response = await plantas.ObtenerPlantaPorId(id);
        res.json({
            message: 'Planta obtenida correctamente',
            data: response
        });
    } catch (error) {
        next(error);
    }
}


//Agregar un producto con POST  
const handlePostPlanta = async (req, res, next) => {
    try {
        const { nombre_planta, precio, origen, descripcion_hojas, ideal_para, agua, luz} = req.body;
        const response = await plantas.agregarPlanta(nombre_planta, precio, origen, descripcion_hojas, ideal_para, agua, luz);
        
        res.json ({
            message: 'Planta agregada correctamente',
            data: response 

        })

    } catch (error) {
        next(error);
    }
}


//Editar un producto con DELETE 
const handleEditPlanta = async (req, res, next) => {
    try {
        const { id } = req.params;

        const cambios = req.body;

        if (Object.keys(cambios).length === 0) {
            return res.status(400).json({ error: 'No se proporcionaron cambios' });
        }
        const response = await plantas.editarPlanta(id, cambios);

        res.json({
            message: 'Planta actualizada correctamente',
            data: response})
    
    } catch (error) {
        next(error);
    }
}


// eliminar una planta 
const handleDeletePlanta = async (req, res, next) => {
    try {
        const { id } = req.params;


        // Verificar si la planta existe
        const existe = await plantas.existe(id);

        if (!existe) {
            throw new Error('PLANT_DELETE_ERROR');
        }

        //Si exisste, se elimina
        const response =  await plantas.eliminarPlanta(id);

        res.status (200).json({
            message: 'Planta eliminada correctamente',
            data: response
        });


    } catch (error) {
        next(error);
    }
}



module.exports = {
    handleGetAllPlantas,
    handlePostPlanta,
    handleEditPlanta,
    handleDeletePlanta,
    handleGetPlanta
}                   