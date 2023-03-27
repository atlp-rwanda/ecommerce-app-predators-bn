'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class Product extends Model {
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
    modelName: 'Product',
  });
  return Product;
};