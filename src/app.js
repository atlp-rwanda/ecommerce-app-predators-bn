// Imports
import morgan from 'morgan';
import session from 'express-session';
import passport from 'passport';
import middleware from 'i18next-http-middleware';
import dotenv from 'dotenv';
import swaggerUI from 'swagger-ui-express';
import express from 'express';
import cors from 'cors';
import swagger from '../docs/swagger.js';
import db from './database/models/index.js';
import i18next from './middleware/i18next.js';
// Routes URL definitions
import prodRoute from './routes/prodRoute.js';
import welcomeRoute from './routes/welcome.js';
import product from "./routes/ProductRoutes.js";
import authRoute from './routes/authRoutes.js';
import category from './routes/categoryRoutes.js';
import otpAuthRouter from './routes/otpAuthRoute.js';
import wishlistRoute from './routes/wishlistRoute.js';

// Sequelize configuration
dotenv.config();
const { sequelize } = db;
sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.');
}).catch((err) => {
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

passport.deserializeUser((id, done) => {
  User.findByPk(id)
    .then((user) => done(null, user))
    .catch((err) => done(err, null));
});

// Routes
app.use('/api/products', prodRoute);
app.use('/auth', otpAuthRouter);
app.use('/api', authRoute);
app.use("/api", product);
app.use('/api/category', category);
app.use('/api', wishlistRoute);
app.use("/", welcomeRoute); 
app.use("/api/cart", cartRoute);
// Export the app
export default app;
