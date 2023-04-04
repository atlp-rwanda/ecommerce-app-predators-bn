import { Router } from 'express';
import passport from 'passport';
import Jwt from '../utils/jwt';
import { googlePass } from '../utils/passport';
const router = Router();
import { googleAuthHandler } from '../controller/authController';

// Google routes
googlePass();
router.get('/callback', (req, res) => {
    if (req.query.key) {
      const user = Jwt.verifyToken(req.query.key);
      return res
        .status(200)
        .json({ message: 'Thanks for logging in', user: user,token: req.query.key });
    } else {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  });
  router.get(
    '/auth/google',
    passport.authenticate('google', { scope: ['email', 'profile'] })
  );
  
  router.get(
    '/auth/google/callback',
    passport.authenticate('google', {
      session: false,
      failureRedirect: '/',
    }),
    googleAuthHandler
  );

export default router;
