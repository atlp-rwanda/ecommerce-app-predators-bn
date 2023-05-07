"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _jsend = _interopRequireDefault(require("jsend"));
var _prodController = require("../controller/prodController.js");
var _roles = require("../middleware/roles.js");
var _index = _interopRequireDefault(require("../database/models/index.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const router = (0, _express.Router)();
router.param('userId', async (req, res, next, id) => {
  // try to get the user details from the User model and attach it to the request object
  const user = await _index.default.User.findOne({
    where: {
      id,
      roleId: 1
    }
  });
  if (user) {
    req.user = user; // assign the user to the request object
    next(); // and pass it to the next middleware/routes/callable, if any. e.g.: req.params.userId
  } else {
    res.status(400).json(_jsend.default.fail({
      message: 'user not found😥'
    }));
  }
});
router.post('/new', _roles.isSeller, _prodController.addProduct);
router.get('/available/:userId', _prodController.showCatalogue);
var _default = router;
exports.default = _default;