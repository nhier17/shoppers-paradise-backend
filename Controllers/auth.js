const User = require('../Models/User')
const {StatusCodes} = require('http-status-codes')
const BadRequest = require('../Errors/badRequest')
const UnauthentificatedError = require('../Errors/unauthentificated')
const { attachCookiesToResponse,createTokenUser } = require('../utils')

//register user
const register = async (req, res) => {
const {email,name, password} = req.body;
//check if email exists
const emailAlreadyExists = await User.findOne({ email })
if (emailAlreadyExists) {
    throw new BadRequest('Email already exists')
}
//first registered user is admin
const isFirstAccount = (await User.countDocuments({})) === 0
const role = isFirstAccount ? 'admin' : 'user'
//create user
const user = await User.create({ name, email, password, role})
//create token
const tokenUser = createTokenUser(user)

attachCookiesToResponse({res, user: tokenUser});

res.status(StatusCodes.CREATED).json({ user: tokenUser})

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
const token = createTokenUser(user);
attachCookiesToResponse({res, user: token});
res.status(StatusCodes.OK).json({user: token })


}
const logout = async (req,res) => {
    res.cookie("token", "logout", {
        expires: new Date(Date.now() + 1000)
    })
    res.status(StatusCodes.OK).json({msg: 'user logged out'})
};

module.exports = {
register,
login,
logout,
}