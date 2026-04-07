const mongoose = require('mongoose');

const providerSchema = new mongoose.Schema({
 
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true 
  },
  
  businessName: {
    type: String,
    required: true,

  },
  
  bio: {
    type: String,
    trim: true,
    maxLength: 500
  },
  
  cnicNumber: {
    type: String,
    required: true,
    unique: true,
 },
  
  cnicImages: {
    type: [String],
    required: true
  },
  
  providerImage: {
    type: [String],
    default: []
  },
  
  address: {
    type: String,
    required: true
  },
  
  
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  
  experience: {
    type: Number,
    default: 0
  },
  
  
  verificationStatus: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const providerModel = mongoose.model('Provider', providerSchema);

module.exports = providerModel;