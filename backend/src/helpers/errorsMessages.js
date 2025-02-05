module.exports = {

    USER_NOT_FOUND: {
        id: 'userNotFound',
        statusCode: 404,
        message: 'Usuario no encontrado',
        description: 'El usuario no existe en el sistema',
    },
    Error_de_servidor: {
        id: 'serverError',
        statusCode: 500,
        message: 'Error interno en el servidor',
        description: 'error inesperado en el servidor',
    },
    Error_de_registro: {
        id: 'registerError',
        statusCode: 405,
        message: 'Error al registrar usuario',
        description: 'error inesperado en el servidor, intenta de nuevo',
    },
    Registro_exitoso: {
        id: 'registerSuccess',
        statusCode: 201,
        message: 'Registro exitoso',
        description: 'Usuario registrado con exito',
    },
    Credenciales_incorrectas: {
        id: 'credentialsError',
        statusCode: 401,
        message: 'Credenciales incorrectas',
        description: 'Credenciales incorrectas',
    }

}