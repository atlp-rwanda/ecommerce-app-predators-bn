"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _applyCouponController = require("../controller/applyCouponController.js");
var _roles = require("../middleware/roles.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const router = _express.default.Router();
router.post('/apply/coupon', _roles.isBuyer, _applyCouponController.applyCoupon);
var _default = router;
exports.default = _default;