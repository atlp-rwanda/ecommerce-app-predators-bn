// Imports
import express, { json } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
const { urlencoded } = bodyParser;
import { serve, setup } from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import morgan from 'morgan';
import i18next from 'i18next';
import Backend from 'i18next-fs-backend';
import middleware from 'i18next-http-middleware';

// Routes URL definitions
import welcomeRoute from './routes/welcome';

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
// confugiration of internation languages
i18next.use(Backend)
.use(middleware.LanguageDetector)
.init({
  fallbackLng: 'en',
  backend:{
      loadPath: './locales/{{lng}}/translation.json'
  }
})
// Initialization
const app = express();
const corsOptions = {
  origin: 'http://localhost:3000', // UPDATE THIS WITH PROCESS.ENV.PORT NUMBER
  methods: 'GET,PUT,PATCH,POST,DELETE',
  optionsSuccessStatus: 200,
};

// Middleware
app.use(middleware.handle(i18next));
app.use(json());
app.use(cors(corsOptions));
app.use(urlencoded({ extended: true }));
app.use(morgan('dev'));

// Routes
app.use('/api-docs', serve, setup(swaggerSpecs));
app.use('/', welcomeRoute);

// export the app
export default app;
