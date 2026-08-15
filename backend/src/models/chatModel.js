const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema(
  {
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    providerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Provider' },
    lastMessage: { type: mongoose.Schema.Types.ObjectId, ref: 'Message' }, 
  },
  { timestamps: true }
);

chatSchema.index({ customerId: 1, providerId: 1 }, { unique: true });

const chatModel = mongoose.model('Chat', chatSchema);
module.exports = chatModel;