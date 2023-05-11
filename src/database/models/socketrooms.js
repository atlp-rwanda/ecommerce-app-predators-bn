import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class SocketRooms extends Model {
    static associate(models) {
      // define association here
    }
  }
  SocketRooms.init({
    socketId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'Socket',
        key: 'id',
      },
    },
    roomId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'Room',
        key: 'id',
      },
    },
  }, {
    sequelize,
    modelName: 'SocketRooms',
  });
  return SocketRooms;
};
