const express = require('express');
const router = express.Router();

const {createPayment} = require('../Controllers/paymentsController')

router.route('/create-payment-intent').post(createPayment);

module.exports = router;