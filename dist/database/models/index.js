"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _fs = require("fs");
var _path = _interopRequireWildcard(require("path"));
var _sequelize = _interopRequireWildcard(require("sequelize"));
var _process = require("process");
var _url = require("url");
var _config = _interopRequireDefault(require("../config/config.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const _filename = (0, _url.fileURLToPath)(import.meta.url);
const _dirname = _path.default.dirname(_filename);
const basename = (0, _path.basename)(_filename);
const env = _process.env.NODE_ENV || 'development';
const config = _config.default[env];
const db = {};
let sequelize;
if (config.use_env_variable) {
  sequelize = new _sequelize.default(_process.env[config.use_env_variable], config);
} else {
  sequelize = new _sequelize.default(config.url, {
    dialect: config.dialect,
    logging: config.logging
  });
}
const modelFiles = (0, _fs.readdirSync)((0, _path.join)(process.cwd(), 'src', 'database', 'models')).filter(file => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js' && file.indexOf('.test.js') === -1);

// eslint-disable-next-line no-restricted-syntax
for (const file of modelFiles) {
  const model = (await (specifier => new Promise(r => r(specifier)).then(s => _interopRequireWildcard(require(s))))(`file:///${(0, _path.join)(process.cwd(), 'src', 'database', 'models', file)}`)).default(sequelize, _sequelize.DataTypes);
  db[model.name] = model;
}
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
db.sequelize = sequelize;
var _default = db;
exports.default = _default;