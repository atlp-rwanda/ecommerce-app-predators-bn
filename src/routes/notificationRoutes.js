/* eslint-disable */
import { Router } from 'express';
import {
  isAdmin,
  isSeller,
  isBuyer,
  checkPermission,
} from '../middleware/roles.js';
import { getAllNotifications, markNotificationAsRead, deleteNotification } from '../controller/notificationController.js';

const router = Router();
router.get('/notification', isSeller, getAllNotifications);
router.put('/:notificationId', isBuyer, markNotificationAsRead);
router.delete('/:notificationId', isBuyer, deleteNotification);
export default router;
