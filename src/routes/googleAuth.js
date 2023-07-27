import { Router } from 'express';
import passport from 'passport';
import dotenv from 'dotenv';

const router = Router();

router.get(
  '/login/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }),
);

router.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    failureMessage: 'Cannot login. Please contact customer support.',
    failureRedirect: process.env.LOGIN_FAILURE_REDIRECT,
    // successRedirect: process.env.LOGIN_SUCCESS_REDIRECT,
  }),
  (req, res) => {
    // if(!req.cookies.user) {
      res.cookie('user', req.user.email, { maxAge: 900000 });
    // }
    console.log('User: ', req.user);
    res.send('SignIn Successful.');
  },
);

router.get('/authentication/get-user', (req, res) => {
  console.log('***User was called*** ');
  try {
    console.log('User: ', req);
    res.send(req);
  } catch (error) {
    console.log('No user');
    res.send('No user');
  }
});

export default router;
