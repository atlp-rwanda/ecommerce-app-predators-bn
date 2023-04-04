const swaggerOptions = {
  definition: {
    openapi: '3.0.1',
    info: {
      title: 'Brogrammers E-COMMERCE PROJECT',
      version: '1.0.0',
      description: 'ATLP Rwanda, Predetors team, E-commerce project',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./src/routes/*.js'], // Path to the API routes files
};
export default swaggerOptions;

