"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerGoogle = exports.getUserByGoogleId = exports.getUserByEmail = void 0;
var _index = _interopRequireDefault(require("../database/models/index.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const registerGoogle = async data => {
  try {
    const user = await _index.default.User.create(data);
    return user;
  } catch (error) {
    console.log(error.message);
    throw new Error('Could not create user');
  }
};
// getUserByEmail
exports.registerGoogle = registerGoogle;
const getUserByEmail = async email => {
  try {
    const user = await _index.default.User.findOne({
      where: {
        email
      }
    });
    return user;
  } catch (error) {
    throw new Error('Could not find user');
  }
};
exports.getUserByEmail = getUserByEmail;
const getUserByGoogleId = async googleId => {
  try {
    const user = await _index.default.User.findOne({
      where: {
        googleId
      }
    });
    return user;
  } catch (error) {
    throw new Error('Could not find user');
  }
};
exports.getUserByGoogleId = getUserByGoogleId;