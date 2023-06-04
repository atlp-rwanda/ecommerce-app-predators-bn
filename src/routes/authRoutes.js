/* eslint-disable import/no-named-as-default-member */
import { Router } from 'express';
import passport from 'passport';
import Jwt from '../utils/jwt.js';
import { googlePass } from '../utils/passport.js';
import profileController from '../controller/profileController.js';
import { getProductById } from '../controller/productController.js';
import vendor from '../controller/vendorController.js';

// Google route
import {
  googleAuthHandler,
  GetUsers,
  GetUserById,
  DeleteUserById,
  logout,
  disableUser,
  register,
  UserLogin,
  AdminLogin,
  requestResetPassword,
  resetPasswordLink,
  resetPassword,
} from '../controller/authController.js';
import {
  isAdmin,
  isSeller,
  isBuyer,
  checkPermission,
} from '../middleware/roles.js';
import { setRole } from '../services/role.services.js';

const router = Router();

// Google routes
googlePass();

router.get('/callback', (req, res) => {
  if (req.query.key) {
    const user = Jwt.verifyToken(req.query.key);
    return res.status(200).json({
      message: 'Thanks for logging in',
      user,
      token: req.query.key,
    });
  }
  return res.status(401).json({ error: 'Unauthorized' });
});
router.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['email', 'profile'] }),
);
router.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    session: false,
    failureRedirect: '/',
  }),
  googleAuthHandler,
);

router.post('/vendor', vendor);
router.post('/logout', logout);
router.get('/users', isAdmin, GetUsers);
router.get('/users/:id', isAdmin, checkPermission('manage users'), GetUserById);
router.delete('/users/:id', isAdmin,checkPermission('manage users'), DeleteUserById);
router.post('/setRole/:id', isAdmin,checkPermission('manage users'), setRole);
router.post('/disableUser/:id', isAdmin, disableUser);
router.post('/login', UserLogin);
router.post('/adminLogin', AdminLogin);
router.post('/register', register);
router.patch('/users/profiles/:id', profileController.updateUserProfile);
router.get('/product/:id', getProductById);

router.post('/reset/password', requestResetPassword);
router.get('/user/reset-password/:token', resetPasswordLink);
router.put('/user/reset-password/:token', resetPassword);

export default router;
