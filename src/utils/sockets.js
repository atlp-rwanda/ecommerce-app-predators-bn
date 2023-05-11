/* eslint-disable no-console */
import chatServices from '../services/chat.services.js';

export default class SocketsHandler {
  constructor(io) {
    this.io = io;
    this.nameSpaceName = this.io.name || '/';
    this.client = null;
    this.activeRoom = null;
  }

  async handleConnection(client) {
    // validate this socket the assign it
    await this.validateSocket(client);
    this.client = client;

    const nspRooms = await SocketsHandler.getNspRooms(this.nameSpaceName);
    // const chats = await chatServices.getConversations(this.activeRoom);

    console.log(`nsp name: ${this.nameSpaceName}`);
    console.log(`nsp rooms: ${nspRooms}`);
    console.log(`active rooms: ${this.activeRoom}`);


    // Send an array of chat objects to the client.
    // this.client.emit('get-chat-history', chats);

    // Event listener for when a message is sent from the client.
    this.client.on('new-message-event', async (destination, message) => {
      console.log(`tracker ${message}`);
      await this.broadcastMessage(destination, message);
    });

    // emit the rooms in this io
    this.client.emit('update-room-list-event', nspRooms);

    // Event listener for when an updated room list.
    this.client.on('update-room-list-event', async (rooms) => {
      this.client.emit('update-room-list-event', rooms);
    });

    // Event listener for when clients joins a room
    this.client.on('join-room-event', async (roomName) => {
      await this.joinRoom(roomName);
    });

    // Event listener for when a client leaves the room
    this.client.on('leave-room-event', async (room) => {
      await this.leaveRoom(room);
    });

    // Event listener for client's disconnected from the server
    this.client.on('disconnect', async () => {
      console.log(`socket ${client.id} disconnected`);
      this.io.emit(`Client: ${client.id} disconnected`);
      // await chatServices.deleteSocket(this.client.id);
    });
  }

  async broadcastMessage(room, message) {
    try {
      // Send a message in the chatroom
      this.client.to(room).emit('new-message-event', room, message);
      // save the message
      await chatServices.addMessage(room, this.client, message);
    } catch (error) {
      console.log(error);
    }
  }

  async joinRoom(destination) { // remember to adjust this code chat service method
    try {
      // add client's record to this room & return new rooms list.
      const results = await chatServices.enterRoom(destination, this.nameSpaceName, this.client.id);
      const rooms = results[0];
      const prntMsg = results[1]; // say "joining..." or "joined..." or"new chatroom..."
      console.log(prntMsg);

      switch (prntMsg) {
        case 'New User joined':
          // n
          this.broadcastMessage(destination, prntMsg);
          break;
        case 'User started one-to-one chat':
          // Inform the target user of incoming connection.
          this.client.to(destination).emit(prntMsg);
          break;
        case 'New Room created':
          // send updated to roomslist to everyone.
          this.io.emit('update-room-list-event', rooms);
          break;
        default:
          throw new Error('Something went wrong!');
      }
      // Join the chatroom specified by the string 'room'
      this.client.join(destination);
    } catch (error) {
      console.log(error);
    }
  }

  static async getNspRooms(nsp) {
    const results = await chatServices.getRooms(nsp);
    if (results.length === 0) return ['No rooms found!'];
    return results;
  }

  async leaveRoom(room) { // remember to adjust this code chat service method
    try {
      // delete client's record in this room & return new rooms list.
      const rooms = await chatServices.exitRoom(room);

      if (!rooms) {
        this.io.to(this.client.id).emit('error', 'You are not in this room');
      } else {
        this.client.in(room).emit('updated-room-list-event', rooms);
        this.client.leave(room);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getUserId() {
    try {
      // get user id from socket_id. (returns user id or undefined)
      return chatServices.getUserId(this.client.id);
    } catch (error) {
      console.log(error);
      return 'error';
    }
  }

  async validateSocket(socket) {
    try {
      console.log(`socket ${socket.id} connected`);

      // Extract token
      const { bearerToken } = socket.handshake.auth;
      if (socket.handshake.query.activeRoom) this.activeRoom = socket.handshake.query.activeRoom;

      // Verify the user is valid
      if (typeof (bearerToken) === 'string') {
        await chatServices.saveSocket(socket.id, bearerToken);
        this.io.emit(`Client: ${socket.id} connected`);
      } else {
        await SocketsHandler.leaveServer(socket);
      }
    } catch (error) {
      console.error(error);
    }
  }

  static async leaveServer(socket) {
    try {
      // disconnect socket_id from server.
      socket.disconnect();
      await chatServices.deleteSocket(socket.id);
      console.log('[leaveServer function called]');
      console.log(`socket ${socket.id} disconnected`);
    } catch (error) {
      console.error(error);
    }
  }
}
