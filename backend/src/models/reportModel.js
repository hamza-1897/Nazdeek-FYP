const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  reporterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user', 
    required: true
  },
  providerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Provider', 
    required: true
  },
  reportType: {
    type: String,
    required: true,
    enum: ['SPAM', 'UNUSUAL_ACTIVITY', 'FRAUD', 'OTHER'],
    default: 'SPAM'
  },
  reason: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    enum: ['pending', 'resolved'],
    default: 'pending'
  }
}, {
  timestamps: true 
});

const reportModel = mongoose.model('Report', reportSchema);
module.exports = reportModel;