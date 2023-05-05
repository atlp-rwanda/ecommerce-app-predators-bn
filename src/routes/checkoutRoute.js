import { checkout } from "../controller/checkoutController.js";
import { Router } from "express";
import { isBuyer } from "../middleware/roles.js";
const router = Router();


router.post("/checkout", isBuyer, checkout);

export default router;