const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
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
  },
  profileImage: {
    type: String,
    default: '' 
  },
  lastLogin: {
    type: Date,
    default: Date.now 
  }
}, { 
  timestamps: true 
});

const adminModel = mongoose.model('Admin', adminSchema);

module.exports = adminModel;