const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const validator = require('validator')


//define my user schema
const passwordStrengthRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide name'],
        minlength: 3,
        maxlength: 50,
    },
    email: {
        type: String,
        required: [true, 'Please provide email'],
         unique: true,
         validate: {
             validator: validator.isEmail,
             message: props => `${props.value} is not a valid email`
         }
    },
    password: {
        type: String,
        required: [true, 'Please provide password'],
        minlength: 6,
        validate: {
            validator: value => passwordStrengthRegex.test(value),
            message: "Password must contain at least one lowercase letter, one uppercase letter or one special character",
        }

    }, 
    role: {
        type: String,
        required: [true, 'Please provide role'],
        enum: ['admin', 'user'],
        default: 'user',
    }, 
    lastViewed: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        
    }]
})
//hash the password
UserSchema.pre('save',async function (){
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})
 // compare password    
UserSchema.methods.comparePassword = async function (userPassword) {
  const isMatch = await bcrypt.compare(userPassword, this.password)
  return isMatch  
}


module.exports = mongoose.model('User', UserSchema);