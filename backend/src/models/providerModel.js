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
    maxLength: 500
  },
  
  cnicNumber: {
    type: String,
    required: true,
    unique: true,
 },

 providerImage: {
    type: String,
    required: true,
  },
  
  //cnicImages: [String ],
  cnicImages: {
    type: [String],
  },
  //workImages: [  String  ],
  workImages: {
    type: [String],
  },


  address: {
    type: String,
    required: true
  },
  
  
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'category',
    required: true
  },
  
  experience: {
    type: Number,
    default: 0
  },
  isPremium: {
    type: Boolean,
    default: false
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