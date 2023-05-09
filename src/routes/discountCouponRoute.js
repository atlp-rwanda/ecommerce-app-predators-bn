// routers/discountCoupon.js
import express from 'express';
import { createCoupon, getCoupons, getCouponById, updateCoupon, deleteCoupon } from '../controller/discountCouponController.js';
import { isSeller } from '../middleware/roles.js';

const router = express.Router();

// Create a new discount coupon
router.post('/createCoupon',isSeller, createCoupon);

// Get all discount coupons for a seller's account
router.get('/getCoupons',isSeller, getCoupons);
router.get('/getCoupons/:id', isSeller, getCouponById)
router.delete('/deleteCoupons/:id', isSeller, deleteCoupon)
router.put('/updateCoupon/:id', isSeller, updateCoupon)

export default router;
