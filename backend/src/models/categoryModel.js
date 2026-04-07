const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    icon   : {
        type: String,
        default: ''
    },
    isActive: {
        type: Boolean,
        default: true   
}, 
}
);

const categoryModel = mongoose.model('category', categorySchema);

module.exports = categoryModel;