"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isSeller = exports.isBuyer = exports.isAdmin = exports.checkUser = exports.checkPermission = void 0;
var _index = _interopRequireDefault(require("../database/models/index.js"));
var _jwt = _interopRequireDefault(require("../utils/jwt.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const isAdmin = async (req, res, next) => {
  const authheader = req.headers.authorization;
  // assuming the token is sent in the Authorization header
  if (!authheader) {
    return res.status(401).json({
      message: 'Token not provided'
    }); // assuming the token is sent in the Authorization header
  }

  const token = authheader.split(" ")[1];
  const {
    id
  } = req.params;
  try {
    const decodedToken = _jwt.default.verifyToken(token);
    const user = await _index.default.User.findOne({
      where: {
        id: decodedToken.value.id
      }
    });
    if (user && decodedToken && decodedToken.value.roleId === 0) {
      req.user = user;
      next();
    } else {
      res.status(403).json({
        message: 'Your are Unauthorized to perform this action'
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Your are Unauthorized to perform this action'
    });
  }
};
exports.isAdmin = isAdmin;
const isSeller = async (req, res, next) => {
  const authheader = req.headers.authorization;
  // assuming the token is sent in the Authorization header
  if (!authheader) {
    return res.status(401).json({
      message: 'Token not provided'
    }); // assuming the token is sent in the Authorization header
  }

  const token = authheader.split(" ")[1];
  const {
    id
  } = req.params;
  try {
    const decodedToken = _jwt.default.verifyToken(token);
    const user = await _index.default.User.findOne({
      where: {
        id: decodedToken.value.id
      }
    });
    if (user && decodedToken && decodedToken.value.roleId === 1) {
      req.user = user;
      next();
    } else {
      res.status(403).json({
        message: "Your are Unauthorized to perform this action"
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "Your are Unauthorized to perform this action"
    });
    console.log(err);
  }
};
exports.isSeller = isSeller;
const isBuyer = async (req, res, next) => {
  const authheader = req.headers.authorization;
  // assuming the token is sent in the Authorization header
  if (!authheader) {
    return res.status(401).json({
      message: 'Token not provided'
    }); // assuming the token is sent in the Authorization header
  }

  const token = authheader.split(' ')[1];
  const {
    id
  } = req.params;
  try {
    const decodedToken = _jwt.default.verifyToken(token);
    const user = await _index.default.User.findOne({
      where: {
        id: decodedToken.value.id
      }
    });
    if (user && decodedToken && decodedToken.value.roleId === 2) {
      req.user = user;
      next();
    } else {
      res.status(403).json({
        message: 'Your are Unauthorized to perform this action'
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Internal server error'
    });
  }
};
exports.isBuyer = isBuyer;
const checkUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      res.status(401).send({
        status: 401,
        message: "Not logged in"
      });
    }
    const token = authHeader.split(" ")[1];
    const decodedToken = _jwt.default.verifyToken(token);
    const user = await _index.default.User.findOne({
      where: {
        id: decodedToken.value.id
      }
    });
    if (user) {
      req.user = user;
      next();
    } else {
      res.status(403).send({
        status: 403,
        message: 'User not found'
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({
      status: 500,
      message: 'Internal server error'
    });
  }
};
exports.checkUser = checkUser;
const checkPermission = permission => async (req, res, next) => {
  const authheader = req.headers.authorization;
  // assuming the token is sent in the Authorization header
  if (!authheader) {
    return res.status(401).json({
      message: "Token not provided"
    }); // assuming the token is sent in the Authorization header
  }

  const token = authheader.split(" ")[1];
  // const { id } = req.params;
  const permissions = {
    0: ['manage users', 'manage products'],
    1: ['manage products'],
    2: ['view products']
  };
  try {
    const decodedToken = _jwt.default.verifyToken(token);
    const user = await _index.default.User.findOne({
      where: {
        id: decodedToken.value.id
      }
    });
    const roleId = decodedToken.value.roleId;
    if (user && permissions[roleId]?.includes(permission)) {
      next();
    } else {
      // next();
      res.status(403).json({
        message: 'Your are Unauthorized to perform this action'
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Internal server error'
    });
  }
};
exports.checkPermission = checkPermission;