/* eslint-disable camelcase */
/* eslint-disable max-len */
/* eslint-disable no-console */
import Chat from 'twilio/lib/rest/Chat.js';
import db from '../database/models/index.js';
import JwtUtility from '../utils/jwt.js';

export default class ChatServices {
  static async getNamespaces() {
    const namespaces = await db.Namespace.findAll({
      order: [['id', 'ASC']],
    });

    return namespaces.map((ns) => ns.name);
  }

  static async addNamespace(chatNamespace) {
    const newChatNamespace = await db.Namespace.create({ name: chatNamespace });
    return newChatNamespace.id;
  }

  static async getChatById(chatId) {
    return db.Chat.findOne({
      where: {
        id: chatId,
      },
    });
  }

  static async addMessage(room, mySocket, message) {
    let roomId;
    let socketId;

    try {
      if (await ChatServices.isRoom(room)) {
        const rm = await db.Room.findOne({ room }).catch((err) => console.log(err));
        roomId = rm.id;
      }
      if (await ChatServices.isSocket(room)) {
        const sock = await db.Socket.findOne({ socket_id: room }).catch((err) => console.log(err));
        socketId = sock.id;
      }

      const userId = await ChatServices.getUserId(mySocket);

      const newMessage = await db.Chat.create({
        roomId, userId, socketId, message,
      });

      return newMessage;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }

  static async getConversations(roomName) {
    try {
      let conversations = null;

      const room = await ChatServices.isRoom(roomName);
      const socket = await ChatServices.isSocket(roomName);
      if (room) {
        conversations = await db.Chat.findAll({
          where: { roomId: room.id },
        });
      } else if (socket) {
        conversations = await db.Chat.findAll({
          where: { socketId: socket.socket_id },
        });
      }
      // console.log(conversations);

      const chatArray = [];
      const chatObject = {};
      return chatArray;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async saveSocket(socket_id, bearerToken) {
    const userId = await ChatServices.verify(bearerToken);

    if (!userId) throw new Error('Trouble receiving user id from token');

    const r = await db.Socket.create({
      userId,
      socket_id,
    }).catch((err) => console.log(err));
    console.log(`[tracker] ${r.id}`);
  }

  static async getUserId(socket) {
    const socketData = await db.Socket.findOne({
      where: { socket_id: socket.id },
    }).catch((err) => console.log(err.name));
    return socketData.userId;
  }

  static async deleteSocket(socket_id) {
    const socket = await db.Socket.findOne({ where: { socket_id } });

    if (!socket) {
      return false;
    }

    await socket.destroy().catch((err) => console.log(err.name));

    return true;
  }

  static async enterRoom(room, namespace, socket_id) {
    let prntMsg;
    let createRoom = false;
    const nsp = await db.Namespace.findOne({ where: { name: namespace } }).catch((err) => console.log(err));
    const namespaceId = nsp.id;

    const chatRoom = await ChatServices.isRoom(room);

    if (chatRoom) {
      const soc = await db.Socket.findOne({ where: { socket_id } }).catch((err) => console.log(err.message));
      if (!soc) throw new Error('Socket does not exist.');
      console.log('this is the socket id %d', soc.id);
      await chatRoom.addSocket(soc.id).catch((error) => console.error(error.message));
      prntMsg = 'New User joined';
    } else {
      const socketExists = await ChatServices.isSocket(room);
      if (socketExists) {
        prntMsg = 'User started one-to-one chat';
      } else {
        prntMsg = 'New Room created';
        createRoom = true;
      }
    }

    if (createRoom) {
      await db.Room.create({ name: room, namespaceId });
    }

    const rooms = await db.Room.findAll({
      where: { namespaceId },
    });

    const roomNames = rooms.map((rm) => rm.name);
    return [roomNames, prntMsg];
  }

  static async getRooms(namespace) {
    try {
      const nsp = await db.Namespace.findOne({
        where: { name: namespace },
      }).catch('namespace error');

      if (!nsp) throw new Error('There are no namespaces');

      const rooms = await db.Room.findAll({
        where: { namespaceId: nsp.id },
      });

      if (!rooms) return [];

      return rooms.map((room) => room.name);
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  }

  static async exitRoom(room, namespace) {
    // delete this socket from this room records

    const rooms = await db.room.findAll({
      where: { namespaceId: namespace.id },
    }).catch('CONSOLEO');

    const roomNames = rooms.map((rm) => rm.name);
    return roomNames;
  }

  static async isRoom(room) {
    return db.Room.findOne({
      where: { name: room },
    }).catch((error) => console.log(error.message));
  }

  static async isSocket(socket_id) {
    const result = db.Socket.findOne({
      where: { socket_id },
    }).catch((error) => console.log(error.message));
    return result;
  }

  static async verify(token) {
    const decoded = JwtUtility.verifyToken(token);
    const user = await db.User.findOne({ where: { id: decoded.value.id } }).catch((err) => console.log(err.message));
    return user.id;
  }
}
