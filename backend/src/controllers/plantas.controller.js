const bcrypt = require('bcrypt');
const plantas= require('../models/plantas');
const { DB } = require('../config/db');

//Obtener todos los productos
const handleGetAllPlantas = async (req, res, next) => {
    try {
        const { limit, order_by, page} = req.query;  //destructuring de limit de query
        const ListadoPlantas = await plantas.obtenerPlantas(limit, order_by, page);

        if (!ListadoPlantas) {
            throw new Error('PLANT_GET_ERROR');
        }

        res.json({
            message: 'Plantas obtenidas correctamente',
            plantas: ListadoPlantas,
           
        });


    } catch (error) {
        next(error);
    }
}

//Obtener un producto por id con GET
const handleGetPlanta = async (req, res, next) => {
    try {
        const { id } = req.params;
        const unaPlanta = await plantas.ObtenerPlantaPorId(id);
        if (!unaPlanta) {
            throw new Error('PLANT_GET_ERROR');
        }

        res.json({
            message: 'Planta obtenida correctamente',
            planta: unaPlanta
        });
    } catch (error) {
        next(error);
    }
};


//Agregar un producto con POST  
const handlePostPlanta = async (req, res, next) => {
    try {
        const { nombre_planta, precio, origen, descripcion_hojas, ideal_para, agua, luz, cantidad, imagen_url} = req.body;
        const response = await plantas.agregarPlanta(nombre_planta, precio, origen, descripcion_hojas, ideal_para, agua, luz, cantidad, imagen_url);
        
        res.json ({
            message: 'Planta agregada correctamente',
            data: response 

        })

    } catch (error) {
        next(error);
    }
}


//Editar un producto con PATCH

const handleEditPlanta = async (req, res, next) => {
    try {
        const { id } = req.params;
        const cambios = req.body;

        if (!cambios || Object.keys(cambios).length === 0) {
            return res.status(400).json({ message: "No se proporcionaron cambios para actualizar" });
        }

        // Verificar si la planta existe
        const plantaExistente = await DB.query('SELECT * FROM plantas WHERE id = $1', [id]);

        if (plantaExistente.rows.length === 0) {
            return res.status(404).json({ message: "Planta no encontrada" });
        }

        const editado = await plantas.editarPlanta(id, cambios);

        res.json({
            message: "Planta actualizada correctamente",
            data: editado
        });

    } catch (error) {
        console.error(error);
        next(error);
    }
};






// eliminar una planta 
const handleDeletePlanta = async (req, res, next) => {
    try {
        const { id } = req.params;
        const borrada =  await plantas.eliminarPlanta(id);

        res.status (200).json({
            message: 'Planta eliminada correctamente',
            data: borrada
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