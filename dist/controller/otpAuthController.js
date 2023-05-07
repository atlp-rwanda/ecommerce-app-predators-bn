"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _speakeasy = _interopRequireDefault(require("speakeasy"));
var _config = _interopRequireDefault(require("config"));
var _qrcode = _interopRequireDefault(require("qrcode"));
var _twilio = _interopRequireDefault(require("twilio"));
var _index = _interopRequireDefault(require("../database/models/index.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable camelcase */

const twilioClient = (0, _twilio.default)(_config.default.twilio.accountSid, _config.default.twilio.authToken);

// [...] Generate OTP
const GenerateOTP = async (req, res) => {
  try {
    const user_id = req.user.dataValues.id;
    const {
      ascii,
      hex,
      base32,
      otpauth_url
    } = _speakeasy.default.generateSecret({
      issuer: _config.default.otp_issuer,
      name: _config.default.otp_name,
      length: _config.default.otp_length
    });
    const qrCodeDataUrl = await _qrcode.default.toDataURL(otpauth_url);
    await _index.default.User.update({
      otp_ascii: ascii,
      otp_auth_url: otpauth_url,
      otp_base32: base32,
      otp_hex: hex
    }, {
      where: {
        id: user_id
      }
    });
    res.status(200).json({
      base32,
      otpauth_url,
      qr_code_data_url: qrCodeDataUrl
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message: error.message
    });
  }
};

// [...] Get OTP via SMS
const GetOTP = async (req, res) => {
  try {
    const user_id = req.user.dataValues.id;
    const user = await _index.default.User.findByPk(user_id);
    if (!user || !user.phone_number) {
      const message = user.phone_number ? "User doesn't exist" : "No phone number set for this user";
      return res.status(400).json({
        status: 'fail',
        message
      });
    }

    // Generate and send the verification code via SMS
    const verificationCode = _speakeasy.default.totp({
      secret: user.otp_base32,
      encoding: 'base32',
      digits: _config.default.otp_length_sms,
      window: 1
    });
    await twilioClient.messages.create({
      body: `Your verification code is ${verificationCode}`,
      to: user.phone_number,
      // the phone number to send the SMS to
      from: _config.default.twilio.phoneNumber // your Twilio phone number
    });

    res.status(200).json({
      status: 'success',
      message: 'verification code sent'
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message: error.message
    });
  }
};

// [...] Verify OTP
const VerifyOTP = async (req, res) => {
  const {
    token
  } = req.body;
  const user_id = req.user.dataValues.id;
  try {
    const user = await _index.default.User.findByPk(user_id);
    const message = "Token is invalid or user doesn't exist";
    if (!user) {
      return res.status(401).json({
        status: 'fail',
        message
      });
    }
    const verified = _speakeasy.default.totp.verify({
      secret: user.otp_base32,
      encoding: 'base32',
      token
    });
    if (!verified) {
      return res.status(401).json({
        status: 'fail',
        message
      });
    }
    const updatedUser = await _index.default.User.update({
      otp_enabled: true,
      otp_verified: true
    }, {
      where: {
        id: user_id
      }
    });
    const userWithUpdatedData = await _index.default.User.findByPk(user_id);
    res.status(200).json({
      otp_verified: true,
      user: {
        id: userWithUpdatedData.id,
        name: userWithUpdatedData.name,
        email: userWithUpdatedData.email,
        otp_enabled: userWithUpdatedData.otp_enabled
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// [...] Validate OTP
const ValidateOTP = async (req, res) => {
  try {
    const {
      token
    } = req.body;
    const user_id = req.user.dataValues.id;
    const user = await _index.default.User.findOne({
      where: {
        id: user_id
      }
    });
    const message = "Token is invalid or user doesn't exist";
    if (!user) {
      return res.status(401).json({
        status: 'fail',
        message
      });
    }
    if (!user.otp_enabled) {
      return res.status(401).json({
        status: 'fail',
        message: '2-factor auth not enabled on this account'
      });
    }
    const validToken = _speakeasy.default.totp.verify({
      secret: user.otp_base32,
      encoding: 'base32',
      token,
      window: 1
    });
    if (!validToken) {
      return res.status(401).json({
        status: 'fail',
        message
      });
    }
    res.status(200).json({
      otp_valid: true
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// [...] Disable OTP
const DisableOTP = async (req, res) => {
  try {
    const user_id = req.user.dataValues.id;
    const user = await _index.default.User.findByPk(user_id);
    if (!user) {
      return res.status(401).json({
        status: 'fail',
        message: "User doesn't exist"
      });
    }
    if (!user.otp_enabled) {
      return res.status(401).json({
        status: 'fail',
        message: '2-factor auth not enabled on this account'
      });
    }
    const updatedUser = await _index.default.User.update({
      otp_enabled: false,
      otp_verified: false,
      otp_ascii: null,
      otp_auth_url: null,
      otp_base32: null,
      otp_hex: null
    }, {
      where: {
        id: user_id
      },
      returning: true
    });
    res.status(200).json({
      otp_disabled: true,
      user: {
        id: updatedUser[1][0].id,
        name: updatedUser[1][0].name,
        email: updatedUser[1][0].email,
        otp_enabled: updatedUser[1][0].otp_enabled
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};
var _default = {
  GenerateOTP,
  VerifyOTP,
  ValidateOTP,
  DisableOTP,
  GetOTP
};
exports.default = _default;