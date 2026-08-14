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
    required: true,
    default: 'customer'
  },
  profileImage: {
    type: String,
    default: null 
  },
  phone:{
    type: String,
    required : true
  }
  ,
  address :{
    type: String,
    default :"",
  },

  fcmToken: {
    type: String,
    default: null 
  },
  isActive: {
    type: Boolean,
    default: true
  },
 
}, { 
  timestamps: true 
});


const userModel = mongoose.model('user', userSchema);

module.exports = userModel;