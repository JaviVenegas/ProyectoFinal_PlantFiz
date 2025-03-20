module.exports = {
    REGISTER_SUCCESS: {
        id: 'registerSuccess',
        statusCode: 201,
        message: 'Registro exitoso',
        description: 'Usuario registrado con éxito',
    },
    PLANT_REGISTER_ERROR: {
        id: 'registerPlantError',
        statusCode: 400,
        message: 'Error al registrar la planta',
        description: 'Falta rellenar algún campo',
    },
    PLANT_GET_ERROR: {
        id: 'erroralobtenerplantas',
        statusCode: 400,
        message: 'Error al obtener las plantas',
        description: 'Error al obtener las plantas',
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
    },
    PASSWORD_CONFIRMATION_MISMATCH: {
        id: 'passwordMismatch',
        statusCode: 400,
        message: 'Contraseñas no coinciden',
        description: 'La nueva contraseña y su confirmación deben ser iguales',
    },
    USER_VALIDATION_ERROR: {
        id: 'userValidationError',
        statusCode: 400,
        message: 'Datos de usuario inválidos',
        description: 'Error en el formato o campos requeridos faltantes',
    },
    UPDATE_USER_ERROR: {
        id: 'updateUserError',
        statusCode: 400,
        message: 'Error al actualizar el usuario',
        description: 'Error inesperado en el servidor, intenta de nuevo',
    },  
    CREDENTIALS_ERROR: {
        id: 'credentialsError',
        statusCode: 401,
        message: 'Credenciales incorrectas',
        description: 'Credenciales incorrectas',
    },
    INVALID_CURRENT_PASSWORD: {
        id: 'invalidCurrentPassword',
        statusCode: 401,
        message: 'Contraseña actual inválida',
        description: 'La contraseña actual ingresada es incorrecta',
    },
    PERMISSION_DENIED: {
        id: 'permissionDenied',
        statusCode: 403,
        message: 'Permiso denegado',
        description: 'No tienes autorización para esta acción',
    },
    USER_NOT_FOUND: {
        id: 'userNotFound',
        statusCode: 404,
        message: 'Usuario no encontrado',
        description: 'El usuario no existe en el sistema',
    },
    REGISTER_ERROR: {
        id: 'registerError',
        statusCode: 405,
        message: 'Error al registrar usuario',
        description: 'Error inesperado en el servidor, intenta de nuevo',
    },
    EMAIL_ALREADY_EXISTS: {
        id: 'emailAlreadyExists',
        statusCode: 409,
        message: 'Correo ya registrado',
        description: 'El correo electrónico ya está asociado a otra cuenta',
    },
    SERVER_ERROR: {
        id: 'serverError',
        statusCode: 500,
        message: 'Error interno en el servidor',
        description: 'Error inesperado en el servidor',
    }
};
