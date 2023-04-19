import { Router } from "express";
import passport from "passport";
import Jwt from "../utils/jwt";
import { googlePass } from "../utils/passport";
import vendor from '../controller/vendorController.js';


import {
  googleAuthHandler,
  GetUsers,
  GetUserById,
  DeleteUserById,
  logout,
  disableUser,
  register,
  UserLogin,
  requestResetPassword,resetPassword,
  resetPasswordLink,
} from "../controller/authController";

import { isAdmin, isSeller,isBuyer, checkPermission } from "../middleware/roles";
import { setRole } from "../services/role.services";
import { disableEnableUsers } from "../controller/disable.acount.controller.js";



const router = Router();
// Google routes
googlePass();

router.get("/callback", (req, res) => {
  if (req.query.key) {
    const user = Jwt.verifyToken(req.query.key);
    return res.status(200).json({
      message: "Thanks for logging in",
      user: user,
      token: req.query.key,
    });
  } else {
    return res.status(401).json({ error: "Unauthorized" });
  }
});
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);
router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/",
  }),
  googleAuthHandler
);
router.post('/vendor',isAdmin, vendor);
router.post("/logout", logout);
router.get("/users", isAdmin,checkPermission("manage users"), GetUsers);
router.get("/users/:id",isAdmin,checkPermission("manage users"), GetUserById);
router.delete("/users/:id", isAdmin, DeleteUserById);
router.post("/setRole", isAdmin,setRole);

router.post("/disableUser",isAdmin,disableUser);
router.post('/login', UserLogin);
router.post('/register', register);

router.post('/reset/password',requestResetPassword);
router.get('/user/reset-password/:token',resetPasswordLink);
router.put('/user/reset-password/:token',resetPassword);


export default router;

