"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _cartController = _interopRequireDefault(require("../controller/cartController.js"));
var _roles = require("../middleware/roles.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const router = (0, _express.Router)();
router.post('/', _roles.isBuyer, _cartController.default.addCartItem);
router.get('/', _roles.isBuyer, _cartController.default.getCartItems);
router.put('/:id', _roles.isBuyer, _cartController.default.updateCartItem);
router.delete('/:id', _roles.isBuyer, _cartController.default.ClearCartItem);
router.delete('/', _roles.isBuyer, _cartController.default.ClearAllCartItem);
var _default = router;
exports.default = _default;