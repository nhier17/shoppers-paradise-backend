const Product = require('../Models/Products')
const CustomError = require('../Errors')
const {StatusCodes} = require('http-status-codes')
const path = require('path')

const getAllProducts = async (req,res) => {
// get all products  
const {category} = req.query
const queryObject = {}


if (category) {
    queryObject.category = category
}
let result = Product.find(queryObject)



const products = await result;
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
    console.log(req.file)
    try {
        const { id, name, category, new_price,old_price, description } =req.body;
        //access upload files
        const image = req.file;
        if (!image) {
            throw new CustomError.NotFoundError('No images uploaded');
        }
        const imagePath = '/uploads/' + image.filename;
          const newProduct = await Product.create({
            id,
            name,
            category,
            image: imagePath, 
            new_price,
            old_price,
            description,
          })
        res.status(StatusCodes.CREATED).json({ newProduct }) 
    } catch (error) {
        console.error(error)
        res.status(StatusCodes.BAD_REQUEST).json({ error: error.message })
    }

}

const updateProducts = async (req,res) => {
    const {id: productId} = req.params
    const product = await Product.findOneAndUpdate({_id: productId}, req.body, {
        new: true,
        runValidators: true,
    })
    if (!product) {
        throw new CustomError.NotFoundError(`no product with id: ${productId}`)
    }
    res.status(StatusCodes.OK).json({ product })
}
const deleteProduct = async (req,res) => {
    const { id: productId } = req.params;

    const product = await Product.findOne({ _id: productId });
  
    if (!product) {
      throw new CustomError.NotFoundError(`No product with id : ${productId}`);
    }
  
    await product.remove();
    res.status(StatusCodes.OK).json({ msg: 'Success! Product removed.' });
}
const uploadImage = async (req,res) => {
    if (!req.files) {
        throw new CustomError.NotFoundError("No files uploaded")
    }
    const productImage = req.files.uploadImage
    if (!productImage.startsWith('image')) {
        throw new CustomError.NotFoundError('Please upload image')
    }
    const imagePath = path.join(
        __dirname,
        '../uploads' + `${productImage.name}`
    )
    await productImage.mv(imagePath);
    res.status(StatusCodes.OK).json({ image: `/uploads/${productImage.name}` })
}

module.exports = {
    getAllProducts,
    getSingleProduct,
    addProducts,
    updateProducts,
    deleteProduct,
    uploadImage,
}

