const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
id: {
type: Number,
required: true,
unique: true,
},  
name: {
    type: String,
    required: true,
},
category: {
type: String,
required: true,
enum: ['men', 'women','kids','smartphones', 'mixed', 'gym']
},
image: {
type: String,
required: true,

},
new_price: {
    type: Number,
    required: true,
},
old_price:{
    type: Number,
    required: true
},
description: {
    type: String,
    required: [true,"Please provide product description" ],
    maxlength: [1000, "Description must be within the range"],
}
})

module.exports = mongoose.model('Product', ProductSchema);