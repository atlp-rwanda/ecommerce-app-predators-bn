import { Router } from 'express';
import { getOrderStatus, updateOrderStatus } from '../controller/checkoutController.js';
import { isAdmin } from '../middleware/roles.js';

const router = Router();
router.get('/status/:orderId', getOrderStatus);
router.patch('/status/:orderId', isAdmin, updateOrderStatus);
export default router;
