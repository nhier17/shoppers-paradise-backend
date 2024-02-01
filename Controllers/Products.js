const Product = require('../Models/Products')
const {StatusCodes} = require('http-status-codes')

const getAllProducts = async (req,res) => {
// get all products  

const products = await Product.find()
res.status(StatusCodes.OK).json({ products })
}

const getSingleProduct = async (req,res) => {
    
try {
    const product = await Product.findById(req.params.id)
    res.status(StatusCodes.OK).json({ product })
} catch (error) {
   res.status(StatusCodes.BAD_REQUEST).json({ error: 'Provide correct details'}) 
}    

}

//add products
const addProducts = async (req,res) => {

 const newProduct = await Product.create(req.body)
 res.status(StatusCodes.CREATED).json({ newProduct })  

}

module.exports = {
    getAllProducts,
    getSingleProduct,
    addProducts,
}

