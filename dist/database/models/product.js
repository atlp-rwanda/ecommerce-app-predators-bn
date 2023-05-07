"use strict";

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
        as: 'vendor',
        onDelete: "CASCADE"
      });
      Product.belongsTo(models.Category, {
        foreignKey: 'category_id',
        as: 'category',
        onDelete: "CASCADE"
      });
    }
    static async findAndPaginateAll({
      page = 1,
      limit = 10,
      where = {}
    }) {
      const offset = (page - 1) * limit;
      const products = await Product.findAll({
        offset,
        limit,
        where
      });
      return products;
    }
  }
  Product.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    category_id: DataTypes.INTEGER,
    price: DataTypes.STRING,
    picture_urls: DataTypes.ARRAY(DataTypes.STRING),
    instock: DataTypes.INTEGER,
    expiryDate: DataTypes.DATE,
    available: DataTypes.BOOLEAN,
    vendor_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product'
  });
  return Product;
};
exports.default = _default;