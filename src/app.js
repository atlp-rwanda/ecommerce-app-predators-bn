// Imports
import express from "express";
import cors from "cors";
import morgan from 'morgan';
import i18next from './middleware/i18next.js';
import middleware from 'i18next-http-middleware';
import swagger from '../docs/swagger.js';
import swaggerUI from "swagger-ui-express";
import otpAuthRouter from "./routes/otpAuthRoute.js";
import db from './database/models/index.js';

// Sequelize configuration
const sequelize = db.sequelize;
sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.');
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});

// Routes URL definitions
import welcomeRoute from "./routes/welcome.js";
import authRoute from "./routes/authRoutes.js";

// App setup
const app = express();
const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(middleware.handle(i18next));

// Swagger
const options = {
  validatorUrl: null,
  oauth: {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    appName: 'Predetors E-commerce',
  },
};
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swagger, false, options));

// Routes
app.use("/auth", otpAuthRouter);
app.use('/register', authRoute);
app.use("/", welcomeRoute);

// Export the app
export default app;
