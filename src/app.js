// Imports
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import session from 'express-session';
import passport from 'passport';
import middleware from 'i18next-http-middleware';
import dotenv from 'dotenv';
import swaggerUI from 'swagger-ui-express';
import i18next from './middleware/i18next.js';
import swagger from './config/swagger.js';
import db from './database/models/index.js';
/* import welcomeRoute from './routes/welcome.js'; */
import authRoute from './routes/authRoutes.js';
// Configuration
dotenv.config();
const { sequelize } = db;
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });
// App setup
const app = express();
const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(middleware.handle(i18next));
app.use(
  session({
    secret: 'some_secret_key',
    resave: false,
    saveUninitialized: false,
  }),
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
};
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swagger, false, options));
// Define user serialization and deserialization functions
passport.serializeUser((user, done) => {
  done(null, user.id);
});

/* app.use('/', welcomeRoute); */
app.use('/api', authRoute);
// Export the app
export default app;
