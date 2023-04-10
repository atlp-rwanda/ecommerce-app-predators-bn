import dotenv from 'dotenv';

dotenv.config();

export default {
  development: {
    url: process.env.DEV_DATABASE_URL,
    dialect: 'postgres',
    logging: false,
  },
  test: {
    url: process.env.TEST_DATABASE_URL,
    dialect: 'postgres',
    logging: false,
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
    logging: false,
  },
<<<<<<< HEAD
};
=======
};

>>>>>>> 014521a (feat(sign-in-with-google): create the Google SignIn feature)
