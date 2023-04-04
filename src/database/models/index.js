<<<<<<< HEAD
import { readdirSync } from 'fs';
import path, { basename as _basename, join } from 'path';
import Sequelize, { DataTypes } from 'sequelize';
import { env as _env } from 'process';
import { fileURLToPath } from 'url';

import Config from '../config/config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const basename = _basename(__filename);
const env = _env.NODE_ENV || 'development';

const config = Config[env];
const db = {};
let sequelize;

if (config.use_env_variable) {
  sequelize = new Sequelize(_env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.url, { dialect: config.dialect, logging: config.logging });
=======
import { readdirSync } from "fs";
import { basename as _basename, join } from "path";
import Sequelize, { DataTypes } from "sequelize";
import { env as _env } from "process";
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const basename = _basename(__filename);
const env = _env.NODE_ENV || "development";
import Config from "../config/config.js";
const config = Config[env];
const db = {};
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(_env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.url, {dialect: config.dialect, logging: config.logging});
>>>>>>> e28c4c4 (feat(sign-in-with-google): create the Google SignIn feature)
}

const modelFiles = readdirSync(join(process.cwd(), 'src', 'database', 'models')).filter((file) => (
  file.indexOf('.') !== 0
<<<<<<< HEAD
  && file !== basename
  && file.slice(-3) === '.js'
  && file.indexOf('.test.js') === -1
));

=======
&& file !== basename
&& file.slice(-3) === '.js'
&& file.indexOf('.test.js') === -1
));
>>>>>>> e28c4c4 (feat(sign-in-with-google): create the Google SignIn feature)
// eslint-disable-next-line no-restricted-syntax
for (const file of modelFiles) {
  const model = (await import(`file:///${join(process.cwd(), 'src', 'database', 'models', file)}`)).default(sequelize, DataTypes);
  db[model.name] = model;
}

<<<<<<< HEAD
Object.keys(db).forEach((modelName) => {
=======
Object.keys(db).forEach(modelName => {
>>>>>>> e28c4c4 (feat(sign-in-with-google): create the Google SignIn feature)
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

<<<<<<< HEAD
export default db;
=======
export default db;
>>>>>>> e28c4c4 (feat(sign-in-with-google): create the Google SignIn feature)
