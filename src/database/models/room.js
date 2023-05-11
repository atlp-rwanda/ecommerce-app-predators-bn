import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Room extends Model {
    static associate(models) {
      Room.belongsTo(models.Namespace, { as: 'namespace' });
      Room.belongsToMany(models.Socket, {
        through: models.SocketRooms,
        foreignKey: 'roomId', // Specify the custom foreign key column for Room
        otherKey: 'socketId',
      });
      Room.hasMany(models.Chat, { as: 'room', foreignKey: 'roomId' });
    }
  }
  Room.init({
    name: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Room',
  });
  return Room;
};
