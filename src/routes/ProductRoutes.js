import {getAllProducts, getProductById, updateProduct, deleteSpecificProduct} from '../controller/productController.js';
import { get_collection, get_available_products } from "../controller/productListingController.js";
import { isAdmin, isSeller, isBuyer, checkPermission,RestrictPassword } from "../middleware/roles.js";
import  productSearch from '../controller/search.controller.js';
import { Router } from "express";
import jsend from 'jsend';
import { addProduct, showCatalogue } from '../controller/prodController.js';
import db from '../database/models/index.js';

const router = Router();


router.param('userId', async (req, res, next, id) => {
  // try to get the user details from the User model and attach it to the request object
  const user = await db.User.findOne({ where: { id, roleId: 1 } });
  if (user) {
    console.log('found the seller');
    req.user = user; // assign the user to the request object
    next(); // and pass it to the next middleware/routes/callable, if any. e.g.: req.params.userId
  } else {
    console.log('seller not found');
    res.status(400).json(jsend.fail({ message: 'user not found😥' }));
  }
});

router.post('/product', isSeller,RestrictPassword, addProduct);
router.get('/product/available/:userId', showCatalogue);
router.get('/product', getAllProducts);
router.get('/product/:id', getProductById);
router.put('/product/:id',isSeller,RestrictPassword, updateProduct);
router.delete('/product/:id', isSeller,RestrictPassword, deleteSpecificProduct)
router.get('/products/search',productSearch);
router.get('/user/products', isBuyer, RestrictPassword,get_available_products);
router.post('/vendor/collection', isSeller, RestrictPassword, get_collection);

export default router;