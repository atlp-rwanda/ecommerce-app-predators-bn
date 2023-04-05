import { Router } from "express";
import passport from "passport";
import Jwt from "../utils/jwt";
import { googlePass } from "../utils/passport";
const router = Router();
import {
  googleAuthHandler,
  GetUsers,
  GetUserById,
  DeleteUserById,
  logout,
  disableUser
} from "../controller/authController";

import { isAdmin,isSeller,isBuyer,checkPermission } from "../middleware/roles";
import{setRole} from '../services/role.services'

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
router.post("/logout", logout);
router.get("/users", isAdmin, GetUsers);
router.get("/users/:id", GetUserById);
router.delete("/users/:id", DeleteUserById);
router.post("/setRole",setRole);
router.post("/disableUser/:id", disableUser);

export default router;
