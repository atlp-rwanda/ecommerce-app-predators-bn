"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.default = void 0;
var _express = _interopRequireWildcard(require("express"));
var _cors = _interopRequireDefault(require("cors"));
var _bodyParser = _interopRequireDefault(require("body-parser"));
var _swaggerUiExpress = require("swagger-ui-express");
var _morgan = _interopRequireDefault(require("morgan"));
var _i18next = _interopRequireDefault(require("./middleware/i18next.js"));
var _i18nextHttpMiddleware = _interopRequireDefault(
  require("i18next-http-middleware")
);
var _swagger = _interopRequireDefault(require("../docs/swagger.js"));
var _swaggerJsdoc = _interopRequireDefault(require("swagger-jsdoc"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _sequelize = _interopRequireDefault(require("sequelize"));
var _welcome = _interopRequireDefault(require("./routes/welcome.js"));
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
function _getRequireWildcardCache(nodeInterop) {
  if (typeof WeakMap !== "function") return null;
  var cacheBabelInterop = new WeakMap();
  var cacheNodeInterop = new WeakMap();
  return (_getRequireWildcardCache = function (nodeInterop) {
    return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
  })(nodeInterop);
}
function _interopRequireWildcard(obj, nodeInterop) {
  if (!nodeInterop && obj && obj.__esModule) {
    return obj;
  }
  if (obj === null || (typeof obj !== "object" && typeof obj !== "function")) {
    return { default: obj };
  }
  var cache = _getRequireWildcardCache(nodeInterop);
  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }
  var newObj = {};
  var hasPropertyDescriptor =
    Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var key in obj) {
    if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor
        ? Object.getOwnPropertyDescriptor(obj, key)
        : null;
      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }
  newObj.default = obj;
  if (cache) {
    cache.set(obj, newObj);
  }
  return newObj;
}
// Imports

const { urlencoded } = _bodyParser.default;
_dotenv.default.config();
// Sequelize set-up

const sequelize = new _sequelize.default(process.env.DATABASE_URL);
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

// Routes URL definitions

// App setup
const app = (0, _express.default)();
const corsOptions = {
  // your options here
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
};
// Middleware
app.use((0, _express.json)());
app.use((0, _cors.default)(corsOptions));
app.use(
  urlencoded({
    extended: true,
  })
);
app.use((0, _morgan.default)("dev"));
app.use(_i18nextHttpMiddleware.default.handle(_i18next.default));
const options = {
  swaggerDefinition: _swagger.default,
  // <-- add this line
  apis: ["./src/routes/*.js"],
};
const swaggerSpec = (0, _swaggerJsdoc.default)(options);
// Swagger UI setup
app.use(
  "/api-docs",
  _swaggerUiExpress.serve,
  (0, _swaggerUiExpress.setup)(swaggerSpec)
);
app.use("/", _welcome.default);

// export the app
var _default = app;
exports.default = _default;
