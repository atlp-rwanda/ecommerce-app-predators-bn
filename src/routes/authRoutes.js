import { Router } from 'express';
import register from '../controller/authController.js';
import vendor from '../controller/vendorController.js';
import { getVendorProfile } from '../services/confirmationEmail.js';

const router = Router();

router.post('/', register);
router.post('/vendor', vendor);
router.get('/users', getVendorProfile);

export default router;
