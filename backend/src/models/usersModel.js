const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  role: {
    type: String,
    enum: ['customer', 'provider'], 
    default: 'customer'
  },
  fcmToken: {
    type: String,
    default: null 
  },
  isActive: {
    type: Boolean,
    default: true
  },
  profileImage: {
    type: String,
    default: '' 
  }
}, { 
  timestamps: true 
});


const UserModel = mongoose.model('user', userSchema);

module.exports = UserModel;