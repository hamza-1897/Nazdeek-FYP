const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    providerId: {    
        type: mongoose.Schema.Types.ObjectId,
        ref: 'provider',
        required: true
    },
    serviceId: {                     
        type: mongoose.Schema.Types.ObjectId,
        ref: 'service',
        required: true
    },
    bookingDate: {
        type: Date,
        required: true
    },
    bookingTime: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled'],
        default: 'pending'
    },
    description: {
        type: String,
        default: ''
    }
});
const bookingModel = mongoose.model('booking', bookingSchema);
module.exports = bookingModel;