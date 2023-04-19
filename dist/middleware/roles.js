"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isSeller = exports.isBuyer = exports.isAdmin = exports.checkPermission = void 0;
var _index = _interopRequireDefault(require("../database/models/index.js"));
var _jwt = _interopRequireDefault(require("../utils/jwt"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const isAdmin = async (req, res, next) => {
<<<<<<< HEAD
  const authheader = req.headers.authorization;
  // assuming the token is sent in the Authorization header
  if (!authheader) {
=======
  const token = req.headers.authorization.split(" ")[1]; // assuming the token is sent in the Authorization header
  if (!token) {
>>>>>>> 2e1d7f8 (ft(seller-delete-specific-item):Created Deleted functionalities)
    return res.status(401).json({
      message: "Token not provided"
    }); // assuming the token is sent in the Authorization header
  }

<<<<<<< HEAD
  const token = authheader.split(" ")[1];
=======
>>>>>>> 2e1d7f8 (ft(seller-delete-specific-item):Created Deleted functionalities)
  try {
    const decodedToken = _jwt.default.verifyToken(token);
    const user = await _index.default.User.findOne({
      where: {
        id: decodedToken.value.id
      }
    });
    if (user && decodedToken && decodedToken.value.roleId === 0) {
      next();
    } else {
      res.status(403).json({
        message: "Your are Unauthorized to perform this action"
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Your are Unauthorized to perform this action"
    });
  }
};
exports.isAdmin = isAdmin;
const isSeller = async (req, res, next) => {
<<<<<<< HEAD
  const authheader = req.headers.authorization;
  // assuming the token is sent in the Authorization header
  if (!authheader) {
=======
  const token = req.headers.authorization.split(" ")[1]; // assuming the token is sent in the Authorization header
  if (!token) {
>>>>>>> 2e1d7f8 (ft(seller-delete-specific-item):Created Deleted functionalities)
    return res.status(401).json({
      message: "Token not provided"
    }); // assuming the token is sent in the Authorization header
  }

<<<<<<< HEAD
  const token = authheader.split(" ")[1];
=======
>>>>>>> 2e1d7f8 (ft(seller-delete-specific-item):Created Deleted functionalities)
  const {
    id
  } = req.params;
  try {
    const decodedToken = _jwt.default.verifyToken(token);
    const user = await _index.default.User.findOne({
      where: {
<<<<<<< HEAD
        id: decodedToken.va.id
=======
        id: decodedToken.id
>>>>>>> 2e1d7f8 (ft(seller-delete-specific-item):Created Deleted functionalities)
      }
    });
    if (user && decodedToken && decodedToken.roleId === 1) {
      next();
    } else {
      res.status(403).json({
        message: "Your are Unauthorized to perform this action"
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Your are Unauthorized to perform this action"
    });
  }
};
exports.isSeller = isSeller;
const isBuyer = async (req, res, next) => {
<<<<<<< HEAD
  const authheader = req.headers.authorization;
  // assuming the token is sent in the Authorization header
  if (!authheader) {
=======
  const token = req.headers.authorization.split(" ")[1]; // assuming the token is sent in the Authorization header
  if (!token) {
>>>>>>> 2e1d7f8 (ft(seller-delete-specific-item):Created Deleted functionalities)
    return res.status(401).json({
      message: "Token not provided"
    }); // assuming the token is sent in the Authorization header
  }

<<<<<<< HEAD
  const token = authheader.split(" ")[1];
=======
>>>>>>> 2e1d7f8 (ft(seller-delete-specific-item):Created Deleted functionalities)
  const {
    id
  } = req.params;
  try {
    const decodedToken = _jwt.default.verifyToken(token);
    const user = await _index.default.User.findOne({
      where: {
<<<<<<< HEAD
        id: decodedToken.value.id
=======
        id: decodedToken.id
>>>>>>> 2e1d7f8 (ft(seller-delete-specific-item):Created Deleted functionalities)
      }
    });
    if (user && decodedToken && decodedToken.roleId === 2) {
      next();
    } else {
      res.status(403).json({
        message: "Your are Unauthorized to perform this action"
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Internal server error"
    });
  }
};
exports.isBuyer = isBuyer;
const checkPermission = permission => async (req, res, next) => {
<<<<<<< HEAD
  const authheader = req.headers.authorization;
  // assuming the token is sent in the Authorization header
  if (!authheader) {
=======
  const token = req.headers.authorization.split(" ")[1]; // assuming the token is sent in the Authorization header
  if (!token) {
>>>>>>> 2e1d7f8 (ft(seller-delete-specific-item):Created Deleted functionalities)
    return res.status(401).json({
      message: "Token not provided"
    }); // assuming the token is sent in the Authorization header
  }

<<<<<<< HEAD
  const token = authheader.split(" ")[1];
=======
  const email = req.params.email;
  if (email === undefined) {
    return res.status(400).json({
      message: "email parameter is missing"
    });
  }
>>>>>>> 2e1d7f8 (ft(seller-delete-specific-item):Created Deleted functionalities)
  // const { id } = req.params;
  const permissions = {
    0: ["manage users", "manage products"],
    1: ["manage products"],
    2: ["view products"]
  };
  try {
    const decodedToken = _jwt.default.verifyToken(token);
    const user = await _index.default.User.findOne({
      where: {
<<<<<<< HEAD
        id: decodedToken.value.id
      }
    });
    const roleId = decodedToken.value.roleId;
    if (user && permissions[roleId]?.includes(permission)) {
      next();
    } else {
      // next();
=======
        email: decodedToken.email
      }
    });
    const roleId = decodedToken.roleId;
    if (user && permissions[roleId]?.includes(permission)) {
      next();
    } else {
      next();
>>>>>>> 2e1d7f8 (ft(seller-delete-specific-item):Created Deleted functionalities)
      res.status(403).json({
        message: "Your are Unauthorized to perform this action"
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Internal server error"
    });
  }
};
exports.checkPermission = checkPermission;