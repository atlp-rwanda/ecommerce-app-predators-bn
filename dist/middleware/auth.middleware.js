"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _jwt = _interopRequireDefault(require("../utils/jwt.js"));
var _jsend = _interopRequireDefault(require("jsend"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class authenticated {
  static auth = async (req, res, next) => {
    try {
      const authHeader = req.headers['authorization'];
      if (!authHeader) return res.status(401).json(_jsend.default.fail({
        message: "You need to be logged"
      }));
      const token = await authHeader.split(" ")[1];
      await _jwt.default.verifyToken(token);
      next();
    } catch (e) {
      throw new Error("Unkown error: " + e.message);
    }
  };
}
exports.default = authenticated;