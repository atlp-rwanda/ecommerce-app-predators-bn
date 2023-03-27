// Imports
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const swaggerUiExpress = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const morgan = require('morgan');

// Documentation setup
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'My API',
      version: '1.0.0',
      description: 'E-commerse Web App',
      contact: {
        name: 'Predators',
        email: 'contact@myapi.com',
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Local server',
      },
    ],
  },
  apis: ['./routes/*.js'],
};

const swaggerSpecs = swaggerJsDoc(swaggerOptions);

// Initialization
const app = express();
const corsOptions = {
  origin: 'http://localhost:3000', // UPDATE THIS WITH PROCESS.ENV.PORT NUMBER
  methods: 'GET,PUT,PATCH,POST,DELETE',
  optionsSuccessStatus: 200,
};

// Middleware
app.use(express.json());
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Routes URL definitions
const welcomeRoute = require('./routes/welcome');

// Routes
app.use('/api-docs', swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerSpecs));
app.use('/', welcomeRoute);

// export the app
module.exports = app;
