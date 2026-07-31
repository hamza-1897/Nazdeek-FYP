const mongoose = require('mongoose');

const settingSchema = new mongoose.Schema({
  paymentAccounts: [
    {
      bankName: { type: String, required: true },
      accountTitle: { type: String, required: true },
      accountNumber: { type: String, required: true },
      isActive: { type: Boolean, default: true }
    }
  ],

  feeConfig: {
    registrationFee: { type: Number, default: 1000 },
    isRegistrationFree: { type: Boolean, default: false },
    monthlyPremiumPrice: { type: Number, default: 1500 },
    quarterlyPremiumPrice: { type: Number, default: 3800 },
    yearlyPremiumPrice: { type: Number, default: 12000 }
  },

  contactDetails: {
    supportPhone: { type: String, default: '+92 300 1234567' },
    supportWhatsapp: { type: String, default: '+92 300 1234567' },
    supportEmail: { type: String, default: 'support@nazdeek.com' },
    officeAddress: { type: String, default: 'Main Commercial Area, Mandi Bahauddin' }
  }
}, { timestamps: true });

const settingModel = mongoose.model('Setting', settingSchema);

module.exports = settingModel;