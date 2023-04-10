// Imports
import express from "express";
import cors from "cors";
import morgan from "morgan";
import session from "express-session";
import passport from "passport";
import i18next from "./middleware/i18next.js";
import middleware from "i18next-http-middleware";
import dotenv from "dotenv";
import swaggerUI from "swagger-ui-express";
import swagger from "./config/swagger.js";
import db from "../src/database/models/index.js";
import welcomeRoute from "./routes/welcome.js";
import authRoute from "./routes/authRoutes.js";
// Configuration
dotenv.config();
const sequelize = db.sequelize;
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
import express, { json } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { serve, setup } from 'swagger-ui-express';
import morgan from 'morgan';
import middleware from 'i18next-http-middleware';
import swaggerJSDoc from 'swagger-jsdoc';
import dotenv from 'dotenv';
import db from './database/models/index.js';
import swaggerOptions from './config/swagger.js';
import i18next from './middleware/i18next.js';

// Routes URL definitions
import welcomeRoute from './routes/welcome.js';
import authRoute from './routes/authRoutes.js';

dotenv.config();

db.sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

// App setup
const app = express();
const { urlencoded } = bodyParser;
const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  // your options here
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(morgan('dev'));
app.use(middleware.handle(i18next));
app.use(
  session({
    secret: "some_secret_key",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Swagger

const options = {
  validatorUrl: null,
  oauth: {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    appName: 'Predetors E-commerce',
  },
  swaggerDefinition: swaggerOptions,
  apis: ['./src/routes/*.js'],
};
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swagger, false, options));
// Define user serialization and deserialization functions
passport.serializeUser((user, done) => {
  done(null, user.id);
});

const swaggerSpec = swaggerJSDoc(options);

// Swagger UI setup
app.use('/api-docs', serve, setup(swaggerSpec));

app.use('/api', authRoute);
app.use('/', welcomeRoute);

// export the app
export default app;