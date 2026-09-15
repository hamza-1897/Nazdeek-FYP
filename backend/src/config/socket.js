const { Server } = require('socket.io');
const messageModel = require('../models/messageModel');
const chatModel = require('../models/chatModel');

let io = null;

const activeChatRooms = new Map();

const addUserToRoom = (chatId, userId) => {
  if (!chatId || !userId) return;
  if (!activeChatRooms.has(chatId)) {
    activeChatRooms.set(chatId, new Set());
  }
  activeChatRooms.get(chatId).add(userId.toString());
};

const removeUserFromRoom = (chatId, userId) => {
  if (!chatId || !userId) return;
  const users = activeChatRooms.get(chatId);
  if (!users) return;
  users.delete(userId.toString());
  if (users.size === 0) {
    activeChatRooms.delete(chatId);
  }
};

const isUserInChatRoom = (chatId, userId) => {
  if (!chatId || !userId) return false;
  const users = activeChatRooms.get(chatId.toString());
  return users ? users.has(userId.toString()) : false;
};

const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: '*',
    },
    pingInterval: 25000,
    pingTimeout: 20000,
  });

  io.on('connection', (socket) => {
    console.log('User Connected:', socket.id);

    socket.on('join_room', (payload) => {
     
      const chatId = typeof payload === 'string' ? payload : payload?.chatId;
      const userId = typeof payload === 'object' ? payload?.userId : undefined;

      if (!chatId) return;
      socket.join(chatId);

      socket.data.chatId = chatId;
      socket.data.userId = userId;

      addUserToRoom(chatId, userId);
      console.log(`User ${socket.id} (userId: ${userId}) joined Chat Room: ${chatId}`);
    });

    socket.on('send_message', (savedMessage) => {
      try {
        const targetRoom = savedMessage.chatId || savedMessage.chat;

        if (targetRoom) {
          io.to(targetRoom).emit('receive_message', savedMessage);
          console.log(`Message emitted to room: ${targetRoom}`);
        }
      } catch (error) {
        console.error('Error in send_message event:', error);
      }
    });

    socket.on('leave_room', (payload) => {
      const chatId = typeof payload === 'string' ? payload : payload?.chatId;
      const userId = typeof payload === 'object' ? payload?.userId : socket.data.userId;

      if (chatId) {
        socket.leave(chatId);
        removeUserFromRoom(chatId, userId);
        console.log(`User ${socket.id} left Chat Room: ${chatId}`);
      }
    });

    socket.on('disconnect', () => {
      if (socket.data.chatId) {
        removeUserFromRoom(socket.data.chatId, socket.data.userId);
      }
      console.log('User Disconnected:', socket.id);
    });
  });

  return io;
};

const getIO = () => io;

module.exports = { initSocket, getIO, isUserInChatRoom };