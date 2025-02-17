const bcrypt = require('bcrypt');
const plantas= require('../models/plantas');


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


        console.log({
            planta: unaPlanta
        }
        );

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


//Editar un producto con PATCH

const handleEditPlanta = async (req, res, next) => {
    try {
        const { id } = req.params;
        const cambios = req.body;

        // Validar que el ID sea un número válido
        if (!id || isNaN(id)) {
            return res.status(400).json({ message: "ID no válido o no proporcionado" });
        }

        // Validar que al menos un campo ha sido modificado
        if (!cambios || Object.keys(cambios).length === 0) {
            return res.status(400).json({ message: "No se proporcionaron cambios para actualizar" });
        }

        // Llamar a la función de edición en la base de datos
        const editado = await plantas.editarPlanta(id, cambios);

        if (!editado) {
            return res.status(404).json({ message: "No se encontró la planta o no se pudo actualizar" });
        }

        res.json({
            message: "Planta actualizada correctamente",
            data: editado
        });

    } catch (error) {
        console.error("Error en handleEditPlanta:", error);
        next(error); // Pasar el error al middleware de manejo de errores
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