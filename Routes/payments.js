const express = require('express');
const router = express.Router();

const {createPayment} = require('../Controllers/paymentsController')

router.route('/').post(createPayment);

module.exports = router;