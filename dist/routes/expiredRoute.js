"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _expiredProductController = _interopRequireDefault(require("../controller/expiredProductController.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const router = _express.default.Router();
router.delete('/cleanUp', _expiredProductController.default);
var _default = router;
exports.default = _default;