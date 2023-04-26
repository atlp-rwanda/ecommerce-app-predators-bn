import {getAllProducts, getProductById, updateProduct} from '../controller/productController';
import { isAdmin, isSeller, isBuyer, checkPermission } from "../middleware/roles.js";
import { Router } from "express";

const router = Router();
router.get('/product', getAllProducts);
router.get('/product/:id', getProductById);
router.put('/product/:id',isSeller,updateProduct);

export default router;