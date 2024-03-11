const mongoose = require('mongoose');

const paymentsSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ['pending', 'accepted', 'declined'],
        default: 'pending',
    },
    transactionId: {
        type: String,
        required: true,
    },
    paymentMethod: {
        type: String,
        required: true,
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Payments', paymentsSchema);
