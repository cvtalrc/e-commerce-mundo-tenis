const mongoose = require('mongoose');
const oderschema = mongoose.Schema({
    user: {
        type: Object,
        ref: 'User'
    },
    cart: {
        type: Object,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    deliveryType: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    }   
});

module.exports = mongoose.model('Order', oderschema);