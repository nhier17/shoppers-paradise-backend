const mongoose = require('mongoose')

const PRoductSchema = new mongoose.Schema({
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
enum: {
    values:['men', 'women','kids']
}
},
image: {
data: Buffer,    
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
}

})

module.exports = mongoose.model('Product', PRoductSchema);