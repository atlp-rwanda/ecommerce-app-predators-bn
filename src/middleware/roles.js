import db from "../database/models/index.js";
import JwtUtility from "../utils/jwt.js";


const isAdmin = async (req, res, next) => {
  const authheader=req.headers.authorization
   // assuming the token is sent in the Authorization header
  if (!authheader) {
    return res.status(401).json({ message: "Token not provided" }); // assuming the token is sent in the Authorization header
  }
  const token = authheader.split(" ")[1];
  try {
    const decodedToken = JwtUtility.verifyToken(token);
    const user = await db.User.findOne({
      where: { id: decodedToken.value.id },
    });
    if (user && decodedToken && decodedToken.value.roleId === 0) {
      next();
    } else {
      res
        .status(403)
        .json({ message: "Your are Unauthorized to perform this action" });
    }
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Your are Unauthorized to perform this action" });
  }
};
const isSeller = async (req, res, next) => {
  const authheader=req.headers.authorization
   // assuming the token is sent in the Authorization header
  if (!authheader) {
    return res.status(401).json({ message: "Token not provided" }); // assuming the token is sent in the Authorization header
  }
  const token = authheader.split(" ")[1];
  const { id } = req.params;
  try {
    const decodedToken = JwtUtility.verifyToken(token);
    const user = await db.User.findOne({ where: { id: decodedToken.va.id } });
    if (user && decodedToken && decodedToken.roleId === 1) {
      next();
    } else {
      res
        .status(403)
        .json({ message: "Your are Unauthorized to perform this action" });
    }
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Your are Unauthorized to perform this action" });
  }
};
const isBuyer = async (req, res, next) => {
  const authheader=req.headers.authorization
   // assuming the token is sent in the Authorization header
  if (!authheader) {
    return res.status(401).json({ message: "Token not provided" }); // assuming the token is sent in the Authorization header
  }
  const token = authheader.split(" ")[1];
  const { id } = req.params;
  try {
    const decodedToken = JwtUtility.verifyToken(token);
    const user = await db.User.findOne({ where: { id: decodedToken.value.id } });
    if (user && decodedToken && decodedToken.roleId === 2) {
      next();
    } else {
      res
        .status(403)
        .json({ message: "Your are Unauthorized to perform this action" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
const checkPermission = (permission) => async (req, res, next) => {
  const authheader=req.headers.authorization
  // assuming the token is sent in the Authorization header
  if (!authheader) {
    return res.status(401).json({ message: "Token not provided" }); // assuming the token is sent in the Authorization header
  }

  const email = req.params.email;
  if (email === undefined) {
    return res.status(400).json({ message: "email parameter is missing" });
  }
  // const { id } = req.params;
  const permissions = {
    0: ["manage users", "manage products"],
    1: ["manage products"],
    2: ["view products"],
  };
  try {
    const decodedToken = JwtUtility.verifyToken(token);
    const user = await db.User.findOne({ where: { id: decodedToken.id } });
    const roleId = decodedToken.roleId;
    if (user && permissions[roleId]?.includes(permission)) {
      next();
    } else {
       next();

      res
        .status(403)
        .json({ message: "Your are Unauthorized to perform this action" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
export { isAdmin, isSeller, isBuyer, checkPermission };