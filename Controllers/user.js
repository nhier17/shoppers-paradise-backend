const User = require('../Models/User');
const {StatusCodes} = require('http-status-codes');
const CustomError = require('../Errors')

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
//get single user
const getSingleUser = async (req,res) => {
    const user = await User.findOne({ _id: req.params.id}).select('-password')
    //check user
    if (!user) {
        throw new CustomeError.NotFoundError(`No user with id: ${req.params.id}`)
    }
    checkPermission(req.user,user._id)
    res.status(StatusCodes.OK).json({ user })
}
// show current user
const showCurrentUser = async (req, res) => {
    res.status(StatusCodes.OK).json({ user: req.user })
}
//update user with user.save()
const updateUser = async (req, res) => {
    const { email, name } = req.body;
    //check email and name
    if (!email ||!name) {
        throw new CustomeError.BadRequest('Please provide email and name')
    }
    const user = await User.findOne({ _id: req.user.id })
    
    user.email = email
    user.name = name
    await user.save()
    const tokenUser = createTokenUser(user)
    attachCookiesToResponse({res, user: tokenUser});
    res.status(StatusCodes.OK).json({ user:tokenUser })
   
}
//update user password

const updateUserPassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    //check password
    if (!oldPassword || !newPassword) {
        throw new CustomeError.BadRequest('Please provide old and new password')
    }

    const user = await User.findOne({ _id: req.user.userId })
    //if password is corrrect
  const isPasswordCorrect = await user.comparePassword(oldPassword)
  // if password is incorrect
  if (isPasswordCorrect) {
    throw new CustomeError.UnauthenticatedError('Invalid old password')
      }
      user.password = newPassword
      await user.save()
      res.status(StatusCodes.OK).json({ msg: "Success! Password updated"})
}
//last view  product
const lastViewedProduct = async (req,res) => {
    const userId = req.params.userId;
    const { productId } = req.body;
    try {
        const user = await User.findById(userId);
        if(!user) {
            throw new CustomeError.NotFoundError(`No user with id: ${userId}`)
        }

        //update last viewed items
        user.lastViewed.push(productId)
        await user.save()
        res.status(StatusCodes.OK).json({ msg: "Success! Product viewed"})
    } catch (error) {
        console.error("Error updating last viewed items",error)
    }
}


module.exports = {
    getAllUsers,
    getSingleUser,
    showCurrentUser,
    updateUser,
    updateUserPassword,
    lastViewedProduct
}