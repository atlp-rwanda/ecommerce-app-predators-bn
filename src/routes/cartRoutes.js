import { Router } from "express";
import { isBuyer } from "../middleware/roles.js";
const router = Router();
import cartController from "../controller/cartController.js"; 

router.post('/', isBuyer,cartController.addCartItem);
router.get('/',isBuyer,cartController.getCartItems); 
router.put('/:id',isBuyer,cartController.updateCartItem);
router.delete('/:id',isBuyer, cartController.ClearCartItem);
router.delete('/',isBuyer, cartController.ClearAllCartItem)

export default router;