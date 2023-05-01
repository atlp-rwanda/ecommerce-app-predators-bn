import express from "express";
import {addWishlist,deleteFromWishlist,getWishlist} from "../controller/wishlistController.js";
import { isAdmin, isSeller,isBuyer, checkPermission } from "../middleware/roles.js";

const router = express.Router();

router.post("/wishlist",  isBuyer, addWishlist)
router.delete("/wishlist/:productId",  isBuyer, deleteFromWishlist)
router.get("/wishlist",  isBuyer, getWishlist)


export default router;