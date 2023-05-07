"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _dotenv = _interopRequireDefault(require("dotenv"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
_dotenv.default.config();
class Jwt {
  static generateToken(data, exp = "1d") {
    return _jsonwebtoken.default.sign(data, process.env.JWT_SECRET, {
      expiresIn: exp
    });
  }
  static verifyToken(token) {
    return _jsonwebtoken.default.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return {
          error: err
        };
      }
      return {
        value: decoded
      };
    });
  }
}
exports.default = Jwt;