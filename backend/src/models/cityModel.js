const mongoose = require('mongoose');
 
const citySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  }
}, { timestamps: true });
 
const cityModel = mongoose.model('City', citySchema);
module.exports = cityModel;