const Payments = require('../Models/payments')
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../Errors');
const stripe = require('stripe')(process.env.API_KEY)

//create payment
const createPayment = async (req, res) => {
    const { amount, paymentMethod} = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: 'usd',
    
    })
    //save payment 
    const payment = new Payments({
        amount: amount,
        status: 'pending',
        transactionId: paymentIntent.id,
        paymentMethod: paymentMethod
    })
    await payment.save()
    res.status(StatusCodes.CREATED).json({ clientSecret: paymentIntent.client_secret })
}

module.exports = {
    createPayment
}