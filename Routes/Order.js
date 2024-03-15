const express = require('express');
const router = express.Router();


const { 
    createOrder,
    getAllOrders
} = require('../Controllers/orderController')

router.route('/create-payment-intent').post(createOrder);

router.route('/').get(getAllOrders);


module.exports = router;