"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _cors = _interopRequireDefault(require("cors"));
var _morgan = _interopRequireDefault(require("morgan"));
var _expressSession = _interopRequireDefault(require("express-session"));
var _passport = _interopRequireDefault(require("passport"));
var _i18next = _interopRequireDefault(require("./middleware/i18next.js"));
var _i18nextHttpMiddleware = _interopRequireDefault(require("i18next-http-middleware"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));
var _swagger = _interopRequireDefault(require("./config/swagger.js"));
var _index = _interopRequireDefault(require("../src/database/models/index.js"));
var _welcome = _interopRequireDefault(require("./routes/welcome.js"));
var _authRoutes = _interopRequireDefault(require("./routes/authRoutes.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// Imports

// Configuration
_dotenv.default.config();
const sequelize = _index.default.sequelize;
sequelize.authenticate().then(() => {
  console.log("Connection has been established successfully.");
}).catch(err => {
  console.error("Unable to connect to the database:", err);
});
// App setup
const app = (0, _express.default)();
const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204
};

// Middleware
app.use(_express.default.json());
app.use(_express.default.urlencoded({
  extended: true
}));
app.use((0, _cors.default)(corsOptions));
app.use((0, _morgan.default)("dev"));
app.use(_i18nextHttpMiddleware.default.handle(_i18next.default));
app.use((0, _expressSession.default)({
  secret: "some_secret_key",
  resave: false,
  saveUninitialized: false
}));
app.use(_passport.default.initialize());
app.use(_passport.default.session());

// Swagger
const options = {
  validatorUrl: null,
  oauth: {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    appName: 'Predetors E-commerce'
  }
};
app.use('/api-docs', _swaggerUiExpress.default.serve, _swaggerUiExpress.default.setup(_swagger.default, false, options));
// Define user serialization and deserialization functions
_passport.default.serializeUser((user, done) => {
  done(null, user.id);
});
app.use("/", _welcome.default);
app.use("/api", _authRoutes.default);
// Export the app
var _default = app;
exports.default = _default;