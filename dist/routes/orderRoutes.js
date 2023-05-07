"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _checkoutController = require("../controller/checkoutController.js");
var _roles = require("../middleware/roles.js");
const router = (0, _express.Router)();
router.get('/status/:orderId', _checkoutController.getOrderStatus);
router.patch('/status/:orderId', _roles.isAdmin, _checkoutController.updateOrderStatus);
var _default = router;
exports.default = _default;