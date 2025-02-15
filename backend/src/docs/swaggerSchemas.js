const schemas = {
    User: {
        type: 'object',
        properties: {
            id: { type: 'integer', example: 1},
            rut: { type: 'string', example: '17.123.345-7'},
            nombre: { type: 'string', example: 'Javiera' },
            apellido: { type: 'string', example: 'Venegas' },
            correo: { type: 'string', example: 'q0A2R@example.com' },
            contrasena: { type: 'string',example: 'password123' },
            rol: { type: 'string', example: 'admin' },
            telefono: { type: 'integer', example: 123456789 },
        },
    },
    Plantas: {
        type: 'object',
        properties: {
            id: { type: 'integer', example: 1},
            nombre_planta: { type: 'string', example: 'Monstera Deliciosa' },
            origen: { type: 'string', example: 'Asia' },
            descripcion_hojas: { type: 'string', example: 'Hojas verdes' },
            ideal_para: { type: 'string', example: 'Ambientes luminosos' },
            agua: { type: 'string', example: 'Riego moderado' },
            luz: { type: 'string', example: 'Luz indirecta' },
        },
    },
    Error: {
        type: 'object',
        properties: {
            messaje: { type: 'string', example: 'Error en los datos' },
            code: { type: 'integer', example: '400' },
            },
        },
};

module.exports = { schemas };