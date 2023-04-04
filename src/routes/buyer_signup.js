import { Router } from 'express';
import register from '../controller/buyer_signup_controller.js';

const router = Router();

router.post('/', register);

export default router;
