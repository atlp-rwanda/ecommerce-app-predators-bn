'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _sequelize = require("sequelize");
var _default = (sequelize, DataTypes) => {
  class ROLES extends _sequelize.Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      ROLES.hasMany(models.User, {
        foreignKey: 'roleId',
        as: 'users'
      });
    }
  }
  ROLES.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ROLES'
  });
  return ROLES;
};
exports.default = _default;