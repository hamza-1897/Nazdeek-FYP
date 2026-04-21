const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    provider: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'provider',
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    serviceImages: [
        {
            type: String,
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const serviceModel = mongoose.model('service', serviceSchema);
module.exports = serviceModel;