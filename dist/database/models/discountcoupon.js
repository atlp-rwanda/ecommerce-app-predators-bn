'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _sequelize = require("sequelize");
var _default = (sequelize, DataTypes) => {
  class DiscountCoupon extends _sequelize.Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      DiscountCoupon.belongsTo(models.Product, {
        foreignKey: 'productId',
        onDelete: 'CASCADE'
      });
    }
  }
  DiscountCoupon.init({
    code: DataTypes.STRING,
    discountPercentage: DataTypes.FLOAT,
    expiresAt: DataTypes.DATE,
    productId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'DiscountCoupon'
  });
  return DiscountCoupon;
};
exports.default = _default;