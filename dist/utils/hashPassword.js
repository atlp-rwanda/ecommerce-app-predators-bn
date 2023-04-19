"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _bcrypt = _interopRequireDefault(require("bcrypt"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
async function hasher(plaintextPassword) {
  // hash password
  const saltRounds = 10;
  const salt = await _bcrypt.default.genSalt(saltRounds);
  const hashedPassword = await _bcrypt.default.hash(plaintextPassword, salt);
  return hashedPassword;
}
var _default = hasher;
exports.default = _default;