import dotenv from 'dotenv';

dotenv.config();

export default {
  // development: {
  //   url: process.env.DEV_DATABASE_URL,
  //   dialect: 'postgres',
  //   logging: false,
  // },
  // test: {
  //   url: process.env.TEST_DATABASE_URL,
  //   dialect: 'postgres',
  //   logging: false,
  // },
  // production: {
  //   url: process.env.DATABASE_URL,
  //   dialect: 'postgres',
  //   logging: false,
  // },
  development: {
    username: process.env.DB_USERNAME,
    password: null,
    database: process.env.DEV_DATABASE_URL,
    host: process.env.DB_HOST,
    dialect: "postgres",
    logging: false,
},
  test: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.TEST_DATABASE_URL,
    host: process.env.DB_HOST,
    dialect: "postgres",
    logging: false,
  },
  production : {
    username: process.env.DB_USERNAME,
    password: null,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "postgres",
    logging: false,
  },
}