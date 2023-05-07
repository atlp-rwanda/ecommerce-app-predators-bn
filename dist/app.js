"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _morgan = _interopRequireDefault(require("morgan"));
var _expressSession = _interopRequireDefault(require("express-session"));
var _config = _interopRequireDefault(require("config"));
var _passport = _interopRequireDefault(require("passport"));
var _i18nextHttpMiddleware = _interopRequireDefault(require("i18next-http-middleware"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));
var _express = _interopRequireDefault(require("express"));
var _cors = _interopRequireDefault(require("cors"));
var _swagger = _interopRequireDefault(require("../docs/swagger.js"));
var _index = _interopRequireDefault(require("./database/models/index.js"));
var _i18next = _interopRequireDefault(require("./middleware/i18next.js"));
var _nodeCronServices = require("./services/node-cron.services.js");
var _orderRoutes = _interopRequireDefault(require("./routes/orderRoutes.js"));
var _welcome = _interopRequireDefault(require("./routes/welcome.js"));
var _ProductRoutes = _interopRequireDefault(require("./routes/ProductRoutes.js"));
var _authRoutes = _interopRequireDefault(require("./routes/authRoutes.js"));
var _notificationRoutes = _interopRequireDefault(require("./routes/notificationRoutes.js"));
var _categoryRoutes = _interopRequireDefault(require("./routes/categoryRoutes.js"));
var _otpAuthRoute = _interopRequireDefault(require("./routes/otpAuthRoute.js"));
var _wishlistRoute = _interopRequireDefault(require("./routes/wishlistRoute.js"));
var _cartRoutes = _interopRequireDefault(require("./routes/cartRoutes.js"));
var _discountCouponRoute = _interopRequireDefault(require("./routes/discountCouponRoute.js"));
var _checkoutRoute = _interopRequireDefault(require("./routes/checkoutRoute.js"));
var _applyCouponRoutes = _interopRequireDefault(require("./routes/applyCouponRoutes.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// Imports

// Routes URL definitions

// Sequelize configuration
_dotenv.default.config();
const {
  sequelize
} = _index.default;
sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.');
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});

// App setup
const app = (0, _express.default)();
const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204
};
// Middleware
app.use(_express.default.json());
app.use(_express.default.urlencoded({
  extended: true
}));
app.use((0, _cors.default)(corsOptions));
if (_config.default.NODE_ENV != 'test') {
  app.use((0, _morgan.default)('dev'));
}
app.use(_i18nextHttpMiddleware.default.handle(_i18next.default));
app.use((0, _expressSession.default)({
  secret: 'some_secret_key',
  resave: false,
  saveUninitialized: false
}));
app.use(_passport.default.initialize());
app.use(_passport.default.session());
_nodeCronServices.expired.start();
_nodeCronServices.expiring_soon.start();
_nodeCronServices.orderExpiry.start();
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
_passport.default.deserializeUser((id, done) => {
  User.findByPk(id).then(user => done(null, user)).catch(err => done(err, null));
});
// Cron job
// Routes

app.use('/auth', _otpAuthRoute.default);
app.use('/api', _authRoutes.default);
app.use('/api', _notificationRoutes.default);
app.use('/api', _checkoutRoute.default);
app.use('/api', _ProductRoutes.default);
app.use('/api/category', _categoryRoutes.default);
app.use('/api', _wishlistRoute.default);
app.use('/api/discount-coupons', _discountCouponRoute.default);
app.use('/api', _applyCouponRoutes.default);
app.use('/', _welcome.default);
app.use('/api/cart', _cartRoutes.default);
app.use('.api', _categoryRoutes.default);
app.use('/api', _orderRoutes.default);
// Export the app
var _default = app;
exports.default = _default;