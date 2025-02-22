const bcrypt = require('bcrypt');
const plantas= require('../models/plantas');
const { DB } = require('../config/db');

//Obtener todos los productos
const handleGetAllPlantas = async (req, res, next) => {
    try {
        const { limit } = req.query;  //destructuring de limit de query
        const ListadoPlantas = await plantas.obtenerPlantas(limit);

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
        const { id } = req.params; // Obtener el ID de los parámetros de la URL
        const cambios = req.body; // Obtener los cambios del cuerpo de la solicitud

        // Validar que el ID sea un número válido
        if (!id || isNaN(id)) {
            return res.status(400).json({ message: "ID no válido o no proporcionado" });
        }

        // Validar que al menos un campo ha sido modificado
        if (!cambios || Object.keys(cambios).length === 0) {
            return res.status(400).json({ message: "No se proporcionaron cambios para actualizar" });
        }

        // Verificar si la planta existe antes de intentar editarla
        const plantaExistente = await DB.query('SELECT * FROM plantas WHERE id = $1', [id]);
        if (plantaExistente.rows.length === 0) {
            return res.status(404).json({ message: "Planta no encontrada" });
        }

        // Extraer la cantidad de los cambios si existe (o establecer un valor por defecto)
        const cantidad = cambios.cantidad !== undefined ? cambios.cantidad : plantaExistente.rows[0].cantidad;
        delete cambios.cantidad;  // Eliminar la cantidad de los cambios para que no se actualice en la tabla plantas

        // Llamar a la función de edición en la base de datos para actualizar la planta
        const editado = await plantas.editarPlanta(id, cambios);

        // Actualizar la cantidad en la tabla `stock_plantas`
        const updateStockQuery = `
            UPDATE stock_plantas 
            SET cantidad = $1 
            WHERE id_planta = $2
            RETURNING *;
        `;
        await DB.query(updateStockQuery, [cantidad, id]);

        // Responder con el resultado de la edición
        res.json({
            message: "Planta y cantidad actualizadas correctamente",
            data: editado
        });

    } catch (error) {
        console.error(error);
        next(error);  // Pasar el error al middleware de manejo de errores
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