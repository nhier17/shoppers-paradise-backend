const User = require('../Models/User')
const {StatusCodes} = require('http-status-codes')
const BadRequest = require('../Errors/badRequest')
const UnauthentificatedError = require('../Errors/unauthentificated')

//register user
const register = async (req, res) => {
    const user = await User.create({...req.body})
    const token = user.createJWT()
    res.status(StatusCodes.CREATED).json({ user: {name: user.name}, token })
}

const login = async (req, res) => {
//check user details
const {email, password} =req.body;
if (!email || !password) {
throw new BadRequest('Please provide email and password')
}
//check user 
const user = await User.findOne({ email })
if(!user) {
    throw new UnauthentificatedError('Invalid email')
}
//check password
const isPasswordCorrect  = await user.comparePassword(password)
if (!isPasswordCorrect) {
    throw new UnauthentificatedError('Incorrect password')
}
// if user exists create token 
const token = user.createJWT();
res.status(StatusCodes.OK).json({user: {name: user.name}, token })


}
const logout = async (req,res) => {
    res.status(StatusCodes.OK).json({msg: 'user logged out'})
};

module.exports = {
register,
login,
logout,
}