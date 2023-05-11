import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Chat extends Model {
    static associate(models) {
      // define association here
      Chat.belongsTo(models.User, { as: 'user', foreignKey: 'userId' });
      Chat.belongsTo(models.Socket, { as: 'socket', foreignKey: 'socketId' });
      Chat.belongsTo(models.Room, { as: 'room', foreignKey: 'roomId' });
    }
  }
  Chat.init({
    message: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Chat',
  });
  return Chat;
};
