"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setRole = exports.default = void 0;
var _index = _interopRequireDefault(require("../database/models/index.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const setRole = async (req, res) => {
  const {
    email,
    role
  } = req.body; // get email and role from request body

  if (!email) {
    return res.status(400).send("Missing email parameter");
  }
  const user = await _index.default.User.findOne({
    where: {
      email
    }
  });
  if (!user) {
    return res.status(404).send(`${email} is not found`);
  }
  user.roleId = role;
  await user.save();
  return res.status(200).send(user);
};
exports.setRole = setRole;
var _default = setRole;
exports.default = _default;