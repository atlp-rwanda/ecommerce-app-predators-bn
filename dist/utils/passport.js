"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.googlePass = void 0;
var _passport = _interopRequireDefault(require("passport"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _passportGoogleOauth = require("passport-google-oauth20");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/* eslint-disable import/prefer-default-export */

_dotenv.default.config();
const googlePass = () => {
  _passport.default.use(new _passportGoogleOauth.Strategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
    scope: ['profile', 'email'],
    passReqToCallback: true
  }, (request, accessToken, refreshToken, profile, done) => done(null, profile)));
  _passport.default.serializeUser((user, done) => {
    done(null, user);
  });
  _passport.default.deserializeUser((user, done) => {
    done(null, user);
  });
};
exports.googlePass = googlePass;