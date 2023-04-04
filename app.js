// Imports
import express, { json } from "express";
import cors from "cors";
import bodyParser from "body-parser";
const { urlencoded } = bodyParser;
import { serve, setup } from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import morgan from "morgan";

// Routes URL definitions
import welcomeRoute from "./routes/welcome.js";

// Documentation setup
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "My API",
      version: "1.0.0",
      description: "E-commerse Web App",
      contact: {
        name: "Predators",
        email: "contact@myapi.com",
      },
      license: {
        name: "MIT",
        url: "https://opensource.org/licenses/MIT",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Local server",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const swaggerSpecs = swaggerJsDoc(swaggerOptions);
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
app.use(json());
app.use(cors(corsOptions));
app.use(urlencoded({ extended: true }));
app.use(morgan("dev"));

// Routes
app.use("/api-docs", serve, setup(swaggerSpecs));
app.use("/", welcomeRoute);

// export the app
export default app;
