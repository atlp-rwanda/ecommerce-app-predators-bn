'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _sequelize = require("sequelize");
var _default = (sequelize, DataTypes) => {
  class User extends _sequelize.Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.ROLES, {
        foreignKey: 'roleId',
        as: 'role',
        onDelete: 'CASCADE'
      });
      User.hasOne(models.Carts, {
        foreignKey: 'User_id',
        as: 'cart',
        onDelete: 'CASCADE'
      });
      User.hasMany(models.Product, {
        foreignKey: 'vendor_id',
        as: 'products',
        onDelete: 'CASCADE'
      });
      User.hasMany(models.Cart_items, {
        foreignKey: 'cart_id',
        as: 'cart_items',
        onDelete: 'CASCADE'
      });
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    roleId: DataTypes.INTEGER,
    status: DataTypes.STRING,
    googleId: DataTypes.INTEGER,
    gender: DataTypes.STRING,
    preferred_language: DataTypes.STRING,
    preferred_currency: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'User'
  });
  return User;
};
exports.default = _default;