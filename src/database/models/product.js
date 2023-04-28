import { Model } from 'sequelize';export default (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.wishlist, {
        foreignKey: 'productId',
        onDelete: 'CASCADE',
      });
      Product.belongsTo(models.User, {
        foreignKey: 'vendor_id',
        as: 'vendor',
      });
      Product.belongsTo(models.Category, {
        foreignKey: 'category_id',
        as: 'category',
      });
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
    vendor_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};
