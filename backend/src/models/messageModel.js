const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
  {
    chatId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Chat',
      required: true,
    },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    senderModel: {
      type: String,
      required: true,
      enum: ['User', 'Provider'],
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    receiverModel: {
      type: String,
      required: true,
      enum: ['User', 'Provider'],
    },
    messageType: {
      type: String,
      enum: ['text', 'image', 'voice'],
      default: 'text',
    },
    text: {
      type: String,
     
      required: function () {
        return this.messageType === 'text';
      },
      default: '',
    },
    mediaUrl: {
      type: String,
      default: null,
    },
    duration: {
      type: Number,
      default: 0,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const messageModel = mongoose.model('Message', messageSchema);
module.exports = messageModel;
