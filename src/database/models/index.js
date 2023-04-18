import { readdirSync } from 'fs';
import path, { basename as _basename, join } from 'path';
import Sequelize, { DataTypes } from 'sequelize';
import { env as _env } from 'process';
import { fileURLToPath } from 'url';
<<<<<<< HEAD
=======

>>>>>>> f03ff16665eecd01c3cf81adcf4f59892dc7b297
import Config from '../config/config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
<<<<<<< HEAD

=======
>>>>>>> f03ff16665eecd01c3cf81adcf4f59892dc7b297
const basename = _basename(__filename);
const env = _env.NODE_ENV || 'development';

const config = Config[env];
const db = {};
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(_env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.url, { dialect: config.dialect, logging: config.logging });
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
