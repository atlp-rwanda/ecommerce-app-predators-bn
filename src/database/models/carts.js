'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class Carts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Carts.hasMany(models.Cart_items, {
        foreignKey: 'cart_id',
        as: 'cart_items',
        onDelete: 'CASCADE',
      });
    }
  }
  Carts.init({
    User_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Carts',
  });
  return Carts;
};