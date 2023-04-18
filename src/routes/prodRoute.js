import { Router } from 'express';
import { registration, showcase } from '../controller/prodController.js';

const router = Router();

router.route('/Register')
  .post(registration)
  .get(showcase);

export default router;
