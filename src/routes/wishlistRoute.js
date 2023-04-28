import express from "express";
import wishlistController from "../controller/wishlistController.js";
import { isAdmin, isSeller,isBuyer, checkPermission } from "../middleware/roles.js";

const router = express.Router();

router.post("/wishlist",  isBuyer, wishlistController)

export default router;