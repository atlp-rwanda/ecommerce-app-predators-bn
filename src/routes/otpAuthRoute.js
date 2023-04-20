import express from "express";
import authController from "../controller/otpAuthController.js";

const router = express.Router();

router.post("/otp/generate", authController.GenerateOTP);
router.post("/otp/getotp", authController.GetOTP);//generates otp by sms
router.post("/otp/verify", authController.VerifyOTP);
router.post("/otp/validate", authController.ValidateOTP);
router.post("/otp/disable", authController.DisableOTP);

export default router;