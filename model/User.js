const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    email: {
        type: String,
        required: true,
        max: 255,
        min: 6
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        min: 6
    },
    phone_number: {
        type: String,
        required: true,
        max:10

    },
    join_date: {
        type: Date,
        default: Date.now
    },
    cart: {
        type: Array,
        required: false,
        default: []
    }

});

module.exports = mongoose.model('User', userSchema)