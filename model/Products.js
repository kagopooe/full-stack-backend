const mongoose = require('mongoose');

const productsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        min: 5,
        max: 300
    },
    features: {
        type: String,
        required: true,
        min: 5,
        max: 300
    },
    price: {
        type: Number,
        required: true,
        min: 6,
        max: 50
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Products', productsSchema)