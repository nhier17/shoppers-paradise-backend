const mongoose = require('mongoose');


const OrderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
    },
    products: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Product',
            required: true,
        }
    ],
    shippingFee: {
        type: Number,
        required: true,
    },
    total: {
        type: Number,
        required: true,
    },
    subtotal: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ['pending', 'accepted', 'declined', 'delivered', 'canceled'],
        default: 'pending',
    },
    transactionId: {
        type: String,
        required: true,
    },
    clientSecret: {
        type: String,
        required: true,
    },
    paymentIntentId: {
        type: String,
    }
})

module.exports = mongoose.model('Order', OrderSchema);