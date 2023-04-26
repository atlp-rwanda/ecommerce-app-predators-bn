import {getAllProducts, getProductById, updateProduct} from '../controller/productController';
import { isAdmin, isSeller, isBuyer, checkPermission } from "../middleware/roles.js";
import  productSearch from '../controller/search.controller';
import { Router } from "express";

const router = Router();
router.get('/product', getAllProducts);
router.get('/product/:id', getProductById);
router.put('/product/:id',isSeller, updateProduct);
router.get('/product/all/search',productSearch);

export default router;