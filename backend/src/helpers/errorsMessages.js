module.exports = {
    USER_NOT_FOUND: {
        id: 'userNotFound',
        statusCode: 404,
        message: 'Usuario no encontrado',
        description: 'El usuario no existe en el sistema',
    },
    SERVER_ERROR: {  
        id: 'serverError',
        statusCode: 500,
        message: 'Error interno en el servidor',
        description: 'Error inesperado en el servidor',
    },
    REGISTER_ERROR: {  
        id: 'registerError',
        statusCode: 405,
        message: 'Error al registrar usuario',
        description: 'Error inesperado en el servidor, intenta de nuevo',
    },
    
    PLANT_REGISTER_ERROR: {  
        id: 'registerPlantError',
        statusCode: 400,
        message: 'Error al registrar la planta',
        description: 'Falta rellenar algún campo',
    },
    PLANT_EDIT_ERROR: { 
        id: 'editPlantError',
        statusCode: 400,
        message: 'Error al editar la planta',
        description: 'Error en los datos enviados',
    },
    PLANT_DELETE_ERROR: {  
        id: 'deletePlantError',
        statusCode: 400,
        message: 'Error al eliminar la planta',
        description: 'No se procesó la eliminación de la planta',
    }
};
