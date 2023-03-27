"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _jsonwebtoken = require("jsonwebtoken");
class AuthMiddleware {
  static async checkAuthentication(req, res, next) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      if (!token) {
        return res.status(400).json({
          msg: 'Please sign in!'
        });
      }
      const data = (0, _jsonwebtoken.verify)(token, process.env.USER_SECRET_KEY);
      if (!data) {
        return res.status(500).json({
          msg: 'Invalid token, Please sign in!'
        });
      }
      req.id = data.id;
      next();
    } catch (error) {
      return res.status(500).json({
        msg: 'Something went wrong, Invalid token'
      });
    }
  }
}
var _default = AuthMiddleware;
exports.default = _default;