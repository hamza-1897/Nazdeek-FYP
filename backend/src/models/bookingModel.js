const mongoose = require('mongoose');
const { getBookingsByProvider } = require('../controllers/provider/bookingController');

const bookingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    providerId: {    
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Provider',
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
    customerName: { type: String, required: true },
  customerPhone: { type: String, required: true },
  bookingAddress: { type: String, required: true },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled'],
        default: 'pending'
    },
    bookingPrice: {
        type: Number,
        default: 0
    },
    description: {
        type: String,
        default: ''
    }
});
const bookingModel = mongoose.model('booking', bookingSchema);
module.exports = bookingModel;