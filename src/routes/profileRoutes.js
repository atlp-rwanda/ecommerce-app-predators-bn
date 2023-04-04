import { Router } from 'express';
import profileController from '../controller/profileController.js';

const router = Router();

router.get('/profiles', profileController.getUserProfile);
router.put('/profiles/updade/:id', profileController.updateUserProfile);

export default router;