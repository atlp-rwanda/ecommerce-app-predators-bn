import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Socket extends Model {
    static associate(models) {
      Socket.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
      Socket.belongsToMany(models.Room, {
        through: models.SocketRooms,
        foreignKey: 'socketId', // Specify the custom foreign key column for Socket
        otherKey: 'roomId',
      });
      Socket.hasMany(models.Chat, { as: 'socket', foreignKey: 'socketId' });
    }
  }
  Socket.init({
    socket_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Socket',
  });
  return Socket;
};
