const { response } = require('express');
const {addSwaggerPath} = require('../swaggerConfig');

addSwaggerPath('/poductos/plantas', 'get', { 
    summary: 'Obtener todas las plantas',
    tags: ['Productos'],
    response: {
        200: {
            description: 'Listado de plantas',
            content: {
                'application/json': {
                    schema: {
                        $ref: '#/components/schemas/Planta',
                    }
                }
            }
        },
        400: {
            description: ' error al obtener las plantas',
            content: {
                'application/json': {
                    schema: {
                        $ref: '#/components/schemas/error',
                    },
                },
            },
        },
        
    },
});
