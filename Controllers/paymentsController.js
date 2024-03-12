const Payments = require('../Models/payments')
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../Errors');
const stripe = require('stripe')(`${process.env.SECRET_KEY}`)

//create payment
const createPayment = async (req, res) => {
    try {
        const { amount, paymentMethod} = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: 'usd',
        
    });
    
    
    //save payment 
    const payment = new Payments({
        amount: amount,
        status: 'pending',
        transactionId: paymentIntent.id,
        paymentMethod: paymentMethod
    })
    await payment.save()
    res.status(StatusCodes.CREATED).json({ clientSecret: paymentIntent.client_secret }) 
    } catch (error) {
        console.error('Error saving payment', error)
        res.status(StatusCodes.BAD_REQUEST).json({ error: error.message })
    }
   
}

module.exports = {
    createPayment
}