"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _checkoutController = require("../controller/checkoutController.js");
var _express = require("express");
var _roles = require("../middleware/roles.js");
const router = (0, _express.Router)();
router.post("/checkout", _roles.isBuyer, _checkoutController.checkout);
var _default = router;
exports.default = _default;