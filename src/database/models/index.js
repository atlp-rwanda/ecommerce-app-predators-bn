import { readdirSync } from 'fs';
import { basename as _basename, join } from 'path';
import Sequelize, { DataTypes } from 'sequelize';
import { env as _env } from 'process';
import config from '../config/config.js';

const basename = _basename(import.meta.url);
const env = _env.NODE_ENV || 'development';

const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(_env[config.use_env_variable], {
    dialect: 'postgres', // replace with your database dialect
    ...config, // add any other database configuration options here
  });
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, {
    dialect: 'postgres', // replace with your database dialect
    ...config, // add any other database configuration options here
  });
}

const modelFiles = readdirSync(join(process.cwd(), 'src', 'database', 'models')).filter((file) => (
  file.indexOf('.') !== 0
&& file !== basename
&& file.slice(-3) === '.js'
&& file.indexOf('.test.js') === -1
));

// eslint-disable-next-line no-restricted-syntax
for (const file of modelFiles) {
  const model = (await import(`file:///${join(process.cwd(), 'src', 'database', 'models', file)}`)).default(sequelize, DataTypes);
  db[model.name] = model;
}

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
