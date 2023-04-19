"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _dotenv = _interopRequireDefault(require("dotenv"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
_dotenv.default.config();
const generateToken = user => {
  const token = _jsonwebtoken.default.sign({
    id: user.id,
    name: user.name,
    email: user.email,
    password: user.password,
    roleId: user.roleId,
    status: user.status
  }, process.env.JWT_SECRET, {
    expiresIn: '1d'
  });
  return token;
};
var _default = generateToken;
exports.default = _default;