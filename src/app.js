// Imports
import express, { json } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { serve, setup } from "swagger-ui-express";
import morgan from "morgan";
import middleware from "i18next-http-middleware";
import swaggerJSDoc from "swagger-jsdoc";
import dotenv from "dotenv";
import db from "./database/models/index.js";
import swaggerOptions from "../docs/swagger.js";
import i18next from "./middleware/i18next.js";

// Routes URL definitions
import welcomeRoute from "./routes/welcome.js";
import authRoute from "./routes/authRoutes.js";

const { urlencoded } = bodyParser;
dotenv.config();

db.sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

// App setup
const app = express();
const corsOptions = {
  // your options here
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
app.use(
  session({
    secret: "some_secret_key",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

const options = {
  swaggerDefinition: swaggerOptions,
  apis: ["./src/routes/*.js"],
};
const swaggerSpec = swaggerJSDoc(options);

// Swagger UI setup
app.use("/api-docs", serve, setup(swaggerSpec));

// Define user serialization and deserialization functions
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findByPk(id)
    .then((user) => done(null, user))
    .catch((err) => done(err, null));
});

app.use("/signup", authRoute);
app.use("/", welcomeRoute);

// export the app
export default app;
