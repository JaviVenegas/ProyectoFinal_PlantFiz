const swaggerJsDoc = require('swagger-jsdoc');

const schemas = require('./swaggerSchemas');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Backend',
            version: '1.0.0',
            description: 'Documentación de la API con swagger',
        },
        components: {
            securitySchemas: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
            schemas, 
        },
        paths: {},
    },
    apis: ['./routes/*.js'],
};

const specs = swaggerJsDoc(options);

const addSwaggerPath = (path, method, config, requireAuth = false) => {
    if(!specs.paths[path]) {
        specs.paths[path] = {};
    }
    if(requireAuth) {
        config.security = [{ bearerAuth: [] }];
    }
    specs.paths[path][method] = config;
}

module.exports = { 
    specs, 
    addSwaggerPath
};