"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _passport = _interopRequireDefault(require("passport"));
var _jwt = _interopRequireDefault(require("../utils/jwt"));
var _passport2 = require("../utils/passport");
var _profileController = _interopRequireDefault(require("../controller/profileController"));
var _authController = require("../controller/authController");
var _roles = require("../middleware/roles");
var _role = require("../services/role.services");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// Google route

const router = (0, _express.Router)();
// Google routes
(0, _passport2.googlePass)();
router.get('/callback', (req, res) => {
  if (req.query.key) {
    const user = _jwt.default.verifyToken(req.query.key);
    return res.status(200).json({
      message: 'Thanks for logging in',
      user,
      token: req.query.key
    });
  }
  return res.status(401).json({
    error: 'Unauthorized'
  });
});
router.get('/auth/google', _passport.default.authenticate('google', {
  scope: ['email', 'profile']
}));
router.get('/auth/google/callback', _passport.default.authenticate('google', {
  session: false,
  failureRedirect: '/'
}), _authController.googleAuthHandler);
router.post('/logout', _authController.logout);
router.get('/users', _roles.isAdmin, (0, _roles.checkPermission)("manage users"), _authController.GetUsers);
router.get('/users/:id', _roles.isAdmin, (0, _roles.checkPermission)("manage users"), _authController.GetUserById);
router.delete('/users/:id', _roles.isAdmin, _roles.isAdmin, (0, _roles.checkPermission)("manage users"), _authController.DeleteUserById);
router.post('/setRole/:id', _roles.isAdmin, _roles.isAdmin, (0, _roles.checkPermission)("manage users"), _role.setRole);
router.post('/disableUser', _roles.isAdmin, _authController.disableUser);
router.post('/login', _authController.UserLogin);
router.post('/register', _authController.register);
router.patch('/users/profiles', _profileController.default.updateUserProfile);
var _default = router;
exports.default = _default;