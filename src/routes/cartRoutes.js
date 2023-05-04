import { Router } from "express";
const router = Router();
import cartController from "../controller/cartController.js";
import {isBuyer} from "../middleware/roles.js";

router.post('/cart', isBuyer ,cartController.addCartItem);


export default router;