import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import dotenv from 'dotenv';
import db from '../database/models/index.js';

const USER = db.User;

const configurePassport = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
        passReqToCallback: true,
      },
      async (req, accessToken, refreshToken, profile, cb) => {
        console.log('using googleAuth...')
        const defaultUser = {
          name: `${profile.name.givenName} ${profile.name.familyName}`,
          email: profile.emails[0].value,
          password: 'password',
          roleId: 2,
          googleId: profile.id,
          status: 'active',
        };

        const user = USER.findOrCreate({
          where: { googleId: profile.id },
          defaults: defaultUser,
        }).catch((error) => {
          console.log('Error signing up: ', error);
          cb(error, null);
        });
        console.log('created new user...');
        if (user && user[0]) {
          return cb(null, user && user[0]);
        }
      },
    ),
  );

  passport.serializeUser((user, cb) => {
    console.log('serializing user');
    cb(null, user.id);
  });
  
  passport.deserializeUser(async (id, cb) => {
    const user = USER.findOne({ where: { id } }).catch((error) => {
      cb(error, null);
    });
    console.log('Deserialized user', user);

    if (user) cb(null, user);
  });
};

export default configurePassport;
