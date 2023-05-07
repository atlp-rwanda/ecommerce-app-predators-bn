"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _otpAuthController = _interopRequireDefault(require("../controller/otpAuthController.js"));
var _roles = require("../middleware/roles.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const router = _express.default.Router();
router.post("/otp/generate", _roles.checkUser, _otpAuthController.default.GenerateOTP);
router.post("/otp/getotp", _roles.checkUser, _otpAuthController.default.GetOTP); //generates otp by sms
router.post("/otp/verify", _roles.checkUser, _otpAuthController.default.VerifyOTP);
router.post("/otp/validate", _roles.checkUser, _otpAuthController.default.ValidateOTP);
router.post("/otp/disable", _roles.checkUser, _otpAuthController.default.DisableOTP);
var _default = router;
exports.default = _default;