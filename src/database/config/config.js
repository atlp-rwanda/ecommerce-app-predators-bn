import dotenv from 'dotenv';

dotenv.config();

export default {
  development: {
    url: 'postgres://postgres:Latifah@1@localhost:5432/Database',
    dialect: 'postgres',
    logging: false,
  },
  test: {
    url: 'postgres://postgres:Latifah@1@localhost:5432/Database',
    dialect: 'postgres',
    logging: false,
  },
  production: {
    url: 'postgres://postgres:Latifah@1@localhost:5432/Database',
    dialect: 'postgres',
    logging: false,
  },
};
