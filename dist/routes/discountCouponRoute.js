"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _discountCouponController = require("../controller/discountCouponController.js");
var _roles = require("../middleware/roles.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// routers/discountCoupon.js

const router = _express.default.Router();

// Create a new discount coupon
router.post('/createCoupon', _roles.isSeller, _discountCouponController.createCoupon);

// Get all discount coupons for a seller's account
router.get('/getCoupons', _roles.isSeller, _discountCouponController.getCoupons);
router.get('/getCoupons/:id', _roles.isSeller, _discountCouponController.getCouponById);
router.delete('/deleteCoupons/:id', _roles.isSeller, _discountCouponController.deleteCouponById);
var _default = router;
exports.default = _default;