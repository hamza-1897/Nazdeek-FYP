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
    console.log(' User Connected:', socket.id);

    socket.on('join_room', (chatId) => {
      socket.join(chatId);
      console.log(`User joined Chat Room: ${chatId}`);
    });

    socket.on('send_message', async (data) => {
      try {
        const { chatId, senderId, senderModel, receiverId, receiverModel, text } = data;

        const newMessage = new messageModel({
          chatId,
          senderId,
          senderModel,
          receiverId,
          receiverModel,
          text,
        });

        const savedMessage = await newMessage.save();

        await chatModel.findByIdAndUpdate(chatId, {
          lastMessage: text,
          lastMessageTime: Date.now(),
        });

        io.to(chatId).emit('receive_message', savedMessage);
      } catch (error) {
        console.error('Error in send_message event:', error);
      }
    });

    socket.on('disconnect', () => {
      console.log('User Disconnected:', socket.id);
    });
  });

  return io;
};

module.exports = initSocket;