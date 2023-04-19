import { Router } from "express";
const router = Router();
import cartController from "../controller/cartController";
import authenticated from "../middleware/auth.middleware";

router.post('/cart',authenticated.auth,cartController);