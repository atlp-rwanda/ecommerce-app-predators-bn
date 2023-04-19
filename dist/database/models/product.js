'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _sequelize = require("sequelize");
var _default = (sequelize, DataTypes) => {
  class Product extends _sequelize.Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.User, {
        foreignKey: 'vendor_id',
        as: 'vendor'
      });
    }
  }
  Product.init({
    Name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.STRING,
    vendor_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product'
  });
  return Product;
};
exports.default = _default;