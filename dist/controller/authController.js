"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resetPasswordLink = exports.resetPassword = exports.requestResetPassword = exports.register = exports.logout = exports.googleAuthHandler = exports.disableUser = exports.default = exports.UserLogin = exports.GetUsers = exports.GetUserById = exports.DeleteUserById = exports.AdminLogin = void 0;
var _bcrypt = _interopRequireDefault(require("bcrypt"));
var _jsend = _interopRequireDefault(require("jsend"));
var _hashPassword = _interopRequireDefault(require("../utils/hashPassword.js"));
var _index = _interopRequireDefault(require("../database/models/index.js"));
var _jwt = _interopRequireDefault(require("../utils/jwt.js"));
var _userServices = require("../services/user.services.js");
var _userToken = _interopRequireDefault(require("../utils/userToken.js"));
var _sendEmail = _interopRequireDefault(require("../utils/sendEmail.js"));
var _dotenv = _interopRequireDefault(require("dotenv"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/* eslint-disable no-else-return */
/* eslint-disable no-shadow */

_dotenv.default.config();
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const AdminLogin = async (req, res) => {
  const {
    email,
    password
  } = req.body;
  try {
    // Check if user with the given email is the admin
    if (email !== ADMIN_EMAIL) {
      return res.status(401).json(_jsend.default.fail({
        message: 'Invalid Credentials😥'
      }));
    }

    // Compare the given password with the admin's hashed password
    const passwordMatches = await _bcrypt.default.compare(password, await _bcrypt.default.hash(ADMIN_PASSWORD, 10));
    if (!passwordMatches) {
      return res.status(401).json(_jsend.default.fail({
        message: 'Invalid Credentials😥'
      }));
    }

    // If the email and password are valid, generate a JWT token
    const token = (0, _userToken.default)({
      email
    });

    // Set the token in a cookie with HttpOnly and Secure flags
    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 3600000 // 1 hour
    });

    res.status(200).json(_jsend.default.success({
      message: 'Login Successful',
      token
    }));
  } catch (error) {
    console.error(error);
    return res.status(500).json(_jsend.default.error({
      message: 'Opps 😰 server error'
    }));
  }
};
exports.AdminLogin = AdminLogin;
const UserLogin = async (req, res) => {
  const {
    email,
    password
  } = req.body;
  try {
    // Check if user with the given email exists
    const user = await _index.default.User.findOne({
      where: {
        email
      }
    });
    if (!user) {
      return res.status(401).json(_jsend.default.fail({
        message: 'Invalid Credentials😥'
      }));
    }
    if (user.status === 'disabled' || user.status === 'inactive') {
      return res.status(401).json(_jsend.default.fail({
        message: 'User is disabled😥'
      }));
    }

    // Compare the given password with the hashed password in the database
    const passwordMatches = await _bcrypt.default.compare(password, user.password);
    if (!passwordMatches) {
      return res.status(401).json(_jsend.default.fail({
        message: 'Invalid Credentials😥'
      }));
    }

    // If the email and password are valid, generate a JWT token
    const token = (0, _userToken.default)(user);

    // Set the token in a cookie with HttpOnly and Secure flags
    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 3600000 // 1 hour
    });

    res.status(200).json(_jsend.default.success({
      message: 'Login Successful',
      token
    }));
  } catch (error) {
    console.error(error);
    return res.status(500).json(_jsend.default.error({
      message: 'Opps 😰 server error'
    }));
  }
};

// Function to create a new user with a Google account
exports.UserLogin = UserLogin;
const googleAuthHandler = async (req, res) => {
  const {
    value
  } = req.user.emails[0];
  const {
    familyName
  } = req.user.name;
  const id = req.user.id.substring(0, 5);

  // Create a new user object with the Google account data
  const newUser = {
    name: familyName,
    email: value,
    password: "password",
    roleId: 2,
    googleId: id,
    status: "active"
  };
  // Check if user already exists
  const user = await (0, _userServices.getUserByGoogleId)(newUser.googleId);
  if (user) {
    // User already exists, generate JWT and redirect
    const {
      id,
      email,
      name,
      password,
      roleId,
      googleId
    } = user;
    const userToken = _jwt.default.generateToken({
      id: id,
      email: email,
      name: name,
      password: password,
      roleId: roleId,
      status: "active",
      googleId: googleId
    }, "1h");
    res.cookie("jwt", userToken);
    return res.redirect(`/api/callback?key=${userToken}`);
  } else {
    // User does not exist, create new user and generate JWT
    const saltRounds = 10;
    const hashedPassword = await _bcrypt.default.hash(newUser.password, saltRounds);
    newUser.password = hashedPassword;
    const {
      id,
      email,
      name,
      password,
      roleId,
      googleId
    } = await (0, _userServices.registerGoogle)(newUser);
    const userToken = _jwt.default.generateToken({
      id: id,
      email: email,
      name: name,
      password: password,
      roleId: roleId,
      status: "active",
      googleId: googleId
    }, "1h");
    res.cookie("jwt", userToken);
    return res.redirect(`/api/callback?key=${userToken}`);
  }
};
// get the user from the database
exports.googleAuthHandler = googleAuthHandler;
const GetUsers = async (req, res) => {
  try {
    const users = await _index.default.User.findAll();
    return res.status(200).json({
      status: 'success',
      data: {
        users
      }
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// get the user from the database by id
exports.GetUsers = GetUsers;
const GetUserById = async (req, res) => {
  try {
    const {
      id
    } = req.params;
    const user = await _index.default.User.findOne({
      where: {
        id
      }
    });
    if (user) {
      return res.status(200).json({
        user
      });
    }
    return res.status(404).send('User with the specified ID does not exists');
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
// delete the user from the database by id
exports.GetUserById = GetUserById;
const DeleteUserById = async (req, res) => {
  try {
    const {
      id
    } = req.params;
    const deleted = await _index.default.User.destroy({
      where: {
        id
      }
    });
    if (deleted) {
      return res.status(204).send('User deleted');
    }
    throw new Error('User not found');
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
exports.DeleteUserById = DeleteUserById;
const logout = (req, res) => {
  try {
    res.clearCookie('jwt');
    // Send success response
    res.status(200).json({
      message: 'Logout successful'
    });
    res.redirect('/');
  } catch (error) {
    console.error(error);
    // Send error response
    res.status(500).json({
      message: 'Internal server error'
    });
  }
};
exports.logout = logout;
const disableUser = async (req, res) => {
  try {
    const {
      id
    } = req.params;
    const {
      status,
      reason
    } = req.body;
    const user = await _index.default.User.findOne({
      where: {
        id
      }
    });
    if (!user) {
      return res.status(400).json(_jsend.default.fail({
        message: `user with this id:${id} does not exit`
      }));
    }
    user.status = status;
    await user.save();
    if (user) {
      const to = user.email;
      const text = `
        Notification of Account Deactivation
Dear User,
We regret to inform you that your account on our website has been ${status} due to a ${reason}. Our team has conducted a thorough investigation and found evidence of unauthorized activity on your account.

As a result, we have taken the necessary steps to protect the security and integrity of our platform by deactivating your account. We take the security of our website and our users very seriously, and we will not tolerate any illegal activities or harmful behavior.

Please note that you will no longer be able to access your account or any associated services. If you have any questions or concerns about this decision, please do not hesitate to contact us at andelapreda@gmail.com.

        
Thank you for your understanding and cooperation.
        
        
Best regards,
        
        
The E-commerce ATLP-Predators project team
`;
      _sendEmail.default.sendEmail(to, 'account status', text);
      return res.status(200).json({
        message: `User account ${status} successfully  `
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};
exports.disableUser = disableUser;
const register = async (req, res) => {
  const {
    name,
    email,
    password,
    gender,
    preferredCurrency,
    preferredLanguage
  } = req.body;

  // Validate user input
  if (!name || !email || !password || !gender || !preferredCurrency || !preferredLanguage) {
    return res.status(400).send('Invalid input');
  }
  const userExists = await _index.default.User.findOne({
    where: {
      email
    }
  });
  if (userExists) {
    return res.status(401).json(_jsend.default.fail({
      message: 'User exists!😥'
    }));
  }
  try {
    // hash password
    const hashedPassword = await (0, _hashPassword.default)(password);

    // Create user in the database (using Sequelize ORM)
    const user = await _index.default.User.create({
      name,
      email,
      roleId: 1,
      password: hashedPassword,
      status: 'active',
      preferred_currency: preferredCurrency,
      preferred_language: preferredLanguage
    });
    res.status(200).json({
      message: user
    }); // /!\use jsend

    // Send confirmation email
  } catch (err) {
    console.error(err);
    return res.status(500).send('Server error');
  }
};

// requesting reset password 
exports.register = register;
const requestResetPassword = async (req, res) => {
  const email = req.body.email;
  try {
    const user = await (0, _userServices.getUserByEmail)(email);
    if (!user) {
      return res.status(400).jsend.error({
        code: 400,
        message: 'User with email does not exist!',
        data: false
      });
    }
    const userEmail = {
      email,
      id: user.id
    };
    const token = _jwt.default.generateToken(userEmail, '15m');
    _sendEmail.default.sendEmail({
      email,
      subject: 'Predators E-commerce Reset Password',
      text: `
                    <p>Reset your password.</p>
                    <p>Please click the link below to reset your password.</p> 
                    
                    <a href="${process.env.APP_URL}/api/user/reset-password/${token}">Reset password</a>
                    
                    `
    });
    res.cookie('reset-token', token, {
      httponly: true,
      expiresIn: '15m'
    });
    res.status(200).send(_jsend.default.success({
      code: 200,
      message: 'Password reset link was sent to your email',
      data: {
        token
      }
    }));
  } catch (error) {
    return res.status(500).send(_jsend.default.fail({
      code: 500,
      message: error.message,
      data: false
    }));
  }
};

// validate reset link
exports.requestResetPassword = requestResetPassword;
const resetPasswordLink = async (req, res) => {
  try {
    const {
      token
    } = req.params;
    const payload = _jwt.default.verifyToken(token);
    const userEmail = {
      email: payload.email
    };
    const user = await (0, _userServices.getUserByEmail)(userEmail.email);
    if (!payload) {
      return res.status(401).send(_jsend.default.fail({
        message: 'Token is invalid',
        data: false
      }));
    } else {
      if (!user) {
        return res.status(401).send(_jsend.default.fail({
          message: "User does not exist",
          data: false
        }));
      }
      return res.status(200).send(_jsend.default.fail({
        message: 'User exists',
        data: user
      }));
    }
  } catch (error) {
    return res.status(401).send(_jsend.default.fail({
      message: error.message,
      data: false
    }));
  }
};

// reset password
exports.resetPasswordLink = resetPasswordLink;
const resetPassword = async (req, res) => {
  try {
    const {
      token
    } = req.params;
    const payload = _jwt.default.verifyToken(token);
    const userPass = req.body;
    await (0, _userServices.updateUserPassword)(payload, userPass).then(result => {
      if (result == 0) {
        return res.status(400).send(_jsend.default.fail({
          message: 'Password reset failed',
          data: false
        }));
      }
      res.cookie('reset-token', '', {
        maxAge: 1
      });
      return res.status(200).send(_jsend.default.success({
        message: 'You have reset successful your password',
        data: resul
      }));
    });
  } catch (error) {
    return res.status(401).send(_jsend.default.fail({
      message: error.message,
      data: false
    }));
  }
};
exports.resetPassword = resetPassword;
var _default = {
  googleAuthHandler,
  GetUsers,
  GetUserById,
  DeleteUserById,
  logout,
  disableUser,
  UserLogin,
  AdminLogin
};
/* eslint-disable consistent-return */
// imports
exports.default = _default;