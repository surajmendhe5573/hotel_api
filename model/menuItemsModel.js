const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    taste: {
        type: String,
        enum: ['sweet', 'spicy', 'sour'],
        required: true,
    },
    num_sales: {
        type: Number,
        default: 0,
    }
})

module.exports = mongoose.model('MenuItem', menuItemSchema);
