// Imports
import express, { json } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { serve, setup } from 'swagger-ui-express';
import morgan from 'morgan';
import middleware from 'i18next-http-middleware';
import swaggerJSDoc from 'swagger-jsdoc';
import dotenv from 'dotenv';
// Sequelize set-up
import Sequelize from 'sequelize';
import swaggerOptions from '../docs/swagger.js';
import i18next from './middleware/i18next.js';

// Routes URL definitions
import welcomeRoute from './routes/welcome.js';
import signUpRoute from './routes/buyer_signup.js';

const { urlencoded } = bodyParser;
dotenv.config();
const sequelize = new Sequelize(process.env.DATABASE_URL);
sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.');
}).catch((err) => {
  console.error('Unable to connect to the database:', err);
});

// App setup
const app = express();
const corsOptions = {
  // your options here
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
};
// Middleware
app.use(json());
app.use(cors(corsOptions));
app.use(urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(middleware.handle(i18next));

const options = {
  swaggerDefinition: swaggerOptions, // <-- add this line
  apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);
// Swagger UI setup
app.use('/api-docs', serve, setup(swaggerSpec));

app.use('/', welcomeRoute);
app.use('/signup', signUpRoute);

// export the app
export default app;
