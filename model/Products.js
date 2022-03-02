const mongoose = require('mongoose');

const productsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        min: 5,
        max: 300
    },
    category: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        min: 5,
        max: 300
    },
    img: {
        type: String,
        required: true
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
    },

    created_by: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Products', productsSchema)