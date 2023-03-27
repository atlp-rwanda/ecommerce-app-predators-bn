'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class Cart_items extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cart_items.belongsTo(models.Carts, {
        foreignKey: 'cart_id',
        as: 'cart',
      });
      Cart_items.belongsTo(models.Product, {
        foreignKey: 'product_id',
        as: 'product',
      });
    }
  }
  Cart_items.init({
    cart_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Cart_items',
  });
  return Cart_items;
};