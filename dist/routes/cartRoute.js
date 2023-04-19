"use strict";

var _express = require("express");
var _cartController = _interopRequireDefault(require("../controller/cartController"));
var _auth = _interopRequireDefault(require("../middleware/auth.middleware"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const router = (0, _express.Router)();
router.post('/cart', _auth.default.auth, _cartController.default);