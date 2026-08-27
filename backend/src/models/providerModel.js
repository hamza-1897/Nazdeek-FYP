const mongoose = require('mongoose');

const providerSchema = new mongoose.Schema({
 
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true ,
    unique: true
  },
  
  businessName: {
    type: String,
    required: true,

  },
  
  description: {
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
  
  cnicImages: {
    type: [String],
  },
  workImages: {
    type: [String],
  },
  
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  address:{
    type:String,
    default:"",

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
    enum: ['unsubmitted','pending', 'approved', 'rejected'],
    default: 'unsubmitted'
  },
   accountRejectionReason: {
    type: String,
    default: null
  },

 paymentDetails: {
    paymentType: { 
      type: String, 
      enum: ['registration', 'premium', null], 
      default: null 
    },
    paymentSlip: { type: String, default: null },       
    submittedAt: { type: Date, default: null },
  },
  registrationFee: { 
    type: String, 
    enum: ['unpaid', 'paid', 'pending_approval'], 
    default: 'unpaid' 
  },
  subscriptionDetails: {
    planId: { 
      type: String, 
      enum: ['monthly', 'quarterly', 'yearly', null], 
      default: null 
    },
    planTitle: { type: String, default: null },
    amount: { type: Number, default: 0 },
    status: { 
      type: String, 
      enum: ['none', 'pending_approval', 'active', 'expired', 'rejected'], 
      default: 'none' 
    },
    activatedAt: { type: Date, default: null },
    expiresAt: { type: Date, default: null }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});



const providerModel = mongoose.model('Provider', providerSchema);

module.exports = providerModel;