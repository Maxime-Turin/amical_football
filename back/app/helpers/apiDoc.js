const path = require('path');

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Amical-Football API',
      description: 'API\'s documentation used by https://amical-football.surge.sh/',
      // contact: {

      // }
      servers: ['http://localhost:4000'],
    },
  },
  apis: [`${path.join(__dirname, '../routers/index.js')}`],
};

module.exports = swaggerOptions;
