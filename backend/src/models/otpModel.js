const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        
    },
    otp: {
        type: String,
        required: true,
    },
    expiresAt: {
        type: Date,
        default: Date.now,
        index: { expires: '2m' } 
    },
});

const otpModel = mongoose.model('OTP', otpSchema);

module.exports = otpModel;