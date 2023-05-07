"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _wishlistController = require("../controller/wishlistController.js");
var _roles = require("../middleware/roles.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const router = _express.default.Router();
router.post("/wishlist", _roles.isBuyer, _wishlistController.addWishlist);
router.delete("/wishlist/:productId", _roles.isBuyer, _wishlistController.deleteFromWishlist);
router.get("/wishlist", _roles.isBuyer, _wishlistController.getWishlist);
var _default = router;
exports.default = _default;