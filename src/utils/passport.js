/* eslint-disable import/prefer-default-export */
import passport from 'passport';
import dotenv from 'dotenv';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

dotenv.config();

export const googlePass = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: "289308035351-nn653ftpjri9775lvjt2vjo075cpstrb.apps.googleusercontent.com",
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
        scope: ['profile', 'email'],
        passReqToCallback: true,
      },
      (request, accessToken, refreshToken, profile, done) => done(null, profile),
    ),
  );
  passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser((user, done) => {
    done(null, user);
  });
};