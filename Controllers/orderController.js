const Order = require('../Models/Order')
const Product = require('../Models/Products')
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../Errors');

const stripe = require('stripe')(`${process.env.SECRET_KEY}`)

const calculateOrderAmount = async (items) => {
try {
    let totalAmount = 0;
    for (const itemId of items) {
        const product = await Product.findById(itemId);
        console.log(product)
        totalAmount += product.new_price;
    }
    return totalAmount * 100;
} catch (error) {
    throw new CustomError("Failed to calculate total amount")
}
}

const createOrder = async (req, res) => {
    try {
        console.log(req.body);
        const { items,user, shippingFee, status } = req.body;
        if (!user || !shippingFee || !status || !items || !items.length === 0) {
            throw new CustomError.BadRequest('Please provide user, shipping fee, status and items')
        }
        //create payment intent
        const totalAmount = await calculateOrderAmount(items);
        const paymentIntent = await stripe.paymentIntents.create({
            amount: totalAmount,
            currency: 'usd',
            automatic_payment_methods: {
                enabled: true,
              },
        });
        console.log('Payment intent created:', paymentIntent);
        //calculate subtotal excluding shipping charges
        const subtotal = (totalAmount / 100) - shippingFee
        //create order
        const order = new Order({
            user: user,
            products: items,
            shippingFee,
            total: totalAmount / 100,
            subtotal,
            status,
            transactionId: paymentIntent.id,
            clientSecret: paymentIntent.client_secret,
            paymentIntentId: paymentIntent.id 
        })
        await order.save()

        res.status(StatusCodes.CREATED).json(order)
    } catch (error) {
        console.error(error)
    }
}

module.exports = {
    createOrder
}