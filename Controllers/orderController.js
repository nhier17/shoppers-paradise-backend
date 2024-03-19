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
    throw new CustomError.BadRequest("Failed to calculate total amount")
}
}
//create the order 
const createOrder = async (req, res) => {
    try {
        const { items } = req.body;
           console.log(req.body);
           
        if ( !items || !items.length ) {
            throw new CustomError.BadRequest('Please provide all the details')
        }
        //create payment intent
        const totalAmount = await calculateOrderAmount(items);
        const paymentIntent = await stripe.paymentIntents.create({
            amount: totalAmount,
            currency: 'usd',
             });
        console.log('Payment intent created:', paymentIntent);
        //calculate subtotal excluding shipping charges
        let shippingFee = 0;
        const subtotal = totalAmount - shippingFee
        //create order
        const order = new Order({
            products: items,
            shippingFee,
            total: totalAmount / 100,
            subtotal: subtotal / 100,
            transactionId: paymentIntent.id,
            clientSecret: paymentIntent.client_secret,
            paymentIntentId: paymentIntent.id 
        })
        //save order to db
        await order.save()

        res.status(StatusCodes.CREATED).json(order)
    } catch (error) {
        console.error(error)
    }
}
//get all orders
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({});
        res.status(StatusCodes.OK).json({orders})
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ error: error.message })
    }
}

module.exports = {
    createOrder,
    getAllOrders
}