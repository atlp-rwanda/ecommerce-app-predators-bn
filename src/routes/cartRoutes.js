import { Router } from "express";
const router = Router();
import cartController from "../controller/cartController";
import authenticated from "../middleware/auth.middleware";

router.post('/',authenticated.auth,cartController.addCartItem);
export default router;