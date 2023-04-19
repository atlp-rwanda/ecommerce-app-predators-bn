"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setRole = exports.default = void 0;
var _index = _interopRequireDefault(require("../database/models/index.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const setRole = async (req, res) => {
  const {
    id
  } = req.params;
  const {
    setRole
  } = req.body; // get email and role from request body
  const user = await _index.default.User.findOne({
    where: {
      id: id
    }
  });
  if (!setRole) {
    return res.status(400).send("Missing setRole parameter");
  }
  if (!user) {
    return res.status(404).send(`${id} is not found`);
  }
  user.roleId = setRole;
  await user.save();
  return res.status(200).send(user);
};
exports.setRole = setRole;
var _default = setRole;
exports.default = _default;