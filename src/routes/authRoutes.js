import { Router } from 'express';
import register from '../controller/authController.js';

const router = Router();

router.post('/', register);

export default router;
