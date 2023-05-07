"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateUserPassword = exports.registerGoogle = exports.getUserByGoogleId = exports.getUserByEmail = void 0;
var _index = _interopRequireDefault(require("../database/models/index.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const registerGoogle = async data => {
  try {
    const user = await _index.default.User.create(data);
    return user;
  } catch (error) {
    return false;
  }
};
//getUserByEmail
exports.registerGoogle = registerGoogle;
const getUserByEmail = async email => {
  try {
    const user = await _index.default.User.findOne({
      where: {
        email: email
      }
    });
    if (!user) {
      return false;
    }
    return user;
  } catch (error) {
    return false;
  }
};
exports.getUserByEmail = getUserByEmail;
const getUserByGoogleId = async googleId => {
  try {
    const user = await _index.default.User.findOne({
      where: {
        googleId: googleId
      }
    });
    return user;
  } catch (error) {
    return false;
  }
};
exports.getUserByGoogleId = getUserByGoogleId;
const updateUserPassword = async (payload, userPass) => {
  try {
    const email = payload.email;
    const pass = userPass.password;
    const password = await hashPassword(pass);
    const findData = await _index.default.User.findOne({
      where: {
        email
      }
    });
    if (userPass.password === userPass.confirm_password) {
      findData.password = password;
      await findData.save().then(result => {
        return result;
      });
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};
exports.updateUserPassword = updateUserPassword;