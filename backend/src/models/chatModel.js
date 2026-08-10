const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    providerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Provider',
      required: true,
    },
  
    lastMessage: {
      type: String,
      default: '',
    },
    lastMessageTime: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Composite index: Customer aur Provider ka 1 hi Chat Room bane
chatSchema.index({ customerId: 1, providerId: 1 }, { unique: true });

const chatModel = mongoose.model('Chat', chatSchema);
module.exports = chatModel;