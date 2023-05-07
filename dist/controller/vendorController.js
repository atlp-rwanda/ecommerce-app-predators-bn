"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _index = _interopRequireDefault(require("../database/models/index.js"));
var _nodemailer = require("nodemailer");
var _crypto = _interopRequireDefault(require("crypto"));
var _bcrypt = _interopRequireDefault(require("bcrypt"));
var _dotenv = _interopRequireDefault(require("dotenv"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/* eslint-disable consistent-return */
// imports

_dotenv.default.config();

// Create a new vendor
const vendor = async (req, res) => {
  const {
    name,
    email,
    gender,
    preferred_language,
    preferred_currency
  } = req.body;

  // Validate user input
  if (!name || !email || !gender || !preferred_language, !preferred_currency) {
    return res.status(400).json({
      status: "fail",
      message: "Please provide all required fields"
    });
  }
  try {
    // Create user in the database (using Sequelize ORM)
    const vendor = await _index.default.User.findOne({
      where: {
        email
      }
    });
    if (vendor) {
      return res.status(400).send("User already exist");
    }
    // generate password randomly
    // const Password = crypto.randomBytes(10).toString();

    // Generate a random password of length 16
    const passwordLength = 16;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_-+=';
    let Password = '';

    // Generate random bytes
    const randomBytes = _crypto.default.randomBytes(passwordLength);

    // Iterate through each byte and map it to a character from the characters string
    for (let i = 0; i < randomBytes.length; i++) {
      const index = Math.floor(randomBytes[i] / 256 * characters.length);
      Password += characters[index];
    }
    const user = await _index.default.User.create({
      name,
      email,
      roleId: 1,
      password: await _bcrypt.default.hash(Password, 10),
      status: "active",
      gender,
      preferred_language,
      preferred_currency
    });
    res.status(200).json({
      message: "Vendor created successfully"
    });

    // Send confirmation email, create a nodemailer transporter
    const transporter = (0, _nodemailer.createTransport)({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      service: "gmail",
      auth: {
        user: process.env.NODE_MAILER_USER,
        pass: process.env.NODE_MAILER_PASS
      }
    });

    // set up the email message
    const mailOptions = {
      from: process.env.NODE_MAILER_USER,
      to: user.email,
      subject: "Confirmation Email",
      text: `Your Vendor account credentials are:
      Email: ${user.email}, Password is: ${Password.toString()}`
    };

    // send the email
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        return res.status(500).json({
          message: "Error sending email"
        });
      } else {
        return res.status(200).json({
          message: "Vendor created successfully"
        });
      }
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server error");
  }
};

// export the post controller
var _default = vendor;
exports.default = _default;