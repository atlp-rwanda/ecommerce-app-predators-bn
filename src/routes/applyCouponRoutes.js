import express from 'express';
import {applyCoupon} from '../controller/applyCouponController.js';
import { isBuyer } from '../middleware/roles.js';

const router = express.Router();
router.post('/apply/coupon',applyCoupon);

export default router;
