const express = require('express');
const router = express.Router();


const {createOrder} = require('../Controllers/orderController')

router.route('/create-payment-intent').post(createOrder);


module.exports = router;