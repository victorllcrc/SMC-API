const swaggerJsdoc = require('swagger-jsdoc')

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'SMC API',
            description: 'Documentación de la API del proyecto SanMarcosConnect',
            version: '1.0.0',
            servers: [
                {
                    url: 'https://smc-app-grengnejapg5ekdp.eastus-01.azurewebsites.net',
                    description: 'Deploy server'
                }
            ]
        }
    },
    apis: ['./swagger/*.yml']
}

const config = swaggerJsdoc(options)
module.exports = config
