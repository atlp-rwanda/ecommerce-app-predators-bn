'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class wishlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      wishlist.belongsTo(models.User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
      });
      wishlist.belongsTo(models.Product, {
        foreignKey: 'productId',
        onDelete: 'CASCADE',
      });
    }
  }
  wishlist.init({
    userId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    category_id: DataTypes.INTEGER,
    price: DataTypes.STRING,
    picture_urls: DataTypes.ARRAY(DataTypes.STRING),
    instock: DataTypes.INTEGER,
    expiryDate: DataTypes.DATE,
    available: DataTypes.BOOLEAN,
    vendor_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'wishlist',
  });
  return wishlist;
};