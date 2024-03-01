const User = require('../Models/User');
const {StatusCodes} = require('http-status-codes');
const CustomeError = require('../Errors')

const {
    createTokenUser,
    attachCookiesToResponse,
    checkPermission
} = require('../utils')

//get all users 
const getAllUsers = async (req,res) => {
    const users = await User.find({role: 'user'}).select('-password')
    res.status(StatusCodes.OK).json({ users })
}

module.exports = {
    getAllUsers
}