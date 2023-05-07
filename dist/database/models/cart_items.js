'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _sequelize = require("sequelize");
var _default = (sequelize, DataTypes) => {
  class Cart_items extends _sequelize.Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cart_items.belongsTo(models.User, {
        foreignKey: 'User_id',
        as: 'user'
      });
      Cart_items.belongsTo(models.Product, {
        foreignKey: 'product_id',
        as: 'product'
      });
    }
  }
  Cart_items.init({
    User_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    amount: DataTypes.FLOAT,
    coupon: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Cart_items'
  });
  return Cart_items;
};
exports.default = _default;