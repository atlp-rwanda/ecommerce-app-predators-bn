"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _swaggerJsdoc = _interopRequireDefault(require("swagger-jsdoc"));
var _dotenv = _interopRequireDefault(require("dotenv"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
_dotenv.default.config();
const swaggerServer = process.env.SWAGGER_SERVER;
const options = {
  definition: {
    openapi: '3.0.1',
    info: {
      title: 'PREDETORS E-COMMERCE PROJECT',
      version: '1.0.0',
      description: 'ATLP Rwanda, Predetors team, E-commerce project'
    },
    servers: [{
      url: swaggerServer
    }],
    components: {
      securitySchemes: {
        google_auth: {
          type: 'oauth2',
          flows: {
            authorizationCode: {
              authorizationUrl: process.env.GOOGLE_CALLBACK_URL
            }
          }
        },
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    }
  },
  apis: ['./docs/*.js', './docs/*.yml']
};
const Swagger = (0, _swaggerJsdoc.default)(options);
var _default = Swagger;
exports.default = _default;