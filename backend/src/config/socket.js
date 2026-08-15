const { Server } = require('socket.io');
const messageModel = require('../models/messageModel');
const chatModel = require('../models/chatModel');

const initSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: '*',
    },
  });

  io.on('connection', (socket) => {
    console.log('User Connected:', socket.id);

    socket.on('join_room', (chatId) => {
      if (!chatId) return;
      socket.join(chatId);
      console.log(`User ${socket.id} joined Chat Room: ${chatId}`);
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

    socket.on('leave_room', (chatId) => {
      if (chatId) {
        socket.leave(chatId);
        console.log(`User ${socket.id} left Chat Room: ${chatId}`);
      }
    });

    socket.on('disconnect', () => {
      console.log('User Disconnected:', socket.id);
    });
  });

  return io;
};

module.exports = initSocket;