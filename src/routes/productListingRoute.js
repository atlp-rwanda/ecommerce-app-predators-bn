//importing product listing controller
import { get_collection, get_available_products } from "../controller/productListingController.js";
import { isBuyer, isSeller } from "../middleware/roles.js";
import { Router } from "express";

const router = new Router();

router.get('/user/products', isBuyer, get_available_products);
router.post('/vendor/collection', isSeller, get_collection);

export default router;