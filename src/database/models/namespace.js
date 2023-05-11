import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Namespace extends Model {
    static associate(models) {
      // define association here
      Namespace.hasMany(models.Room, { foreignKey: 'namespaceId', onDelete: 'CASCADE' });
    }
  }
  Namespace.init({
    name: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Namespace',
  });
  return Namespace;
};
