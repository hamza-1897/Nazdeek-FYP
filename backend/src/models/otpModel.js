const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    name: {
        type: String,
        default: " "
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        default: " "
        
    },
    otp: {
        type: Number,
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