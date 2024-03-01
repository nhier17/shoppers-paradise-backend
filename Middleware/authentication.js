const CustomeError = require('../Errors')
const { isTokenValid } = require('../utils')

const authenticateUser = async (req,res, next) => {
    const token = req.signedCookies.token;
    //check token 
    if (!token) {
        throw new CustomeError.Unauthenticated('Invalid Authentication')
    }
    try {
        //validate token
        const {name, userId, role} = isTokenValid({token})
        //attach user info to request
        req.user = {name, userId, role}
        next()
    } catch (error) {
        throw new CustomeError.Unauthenticated('Invalid Authentication')
    }
}
    //permissions
    const authorizePermissions = (...roles) => {
        return (req,res,next) => {
            //check role
            if (!roles.includes(req.user.role)) {
                throw new CustomeError.unauthorizedError('You are not authorized to access this route')
            }
            next()
        }
        }


module.exports = {
    authenticateUser,
    authorizePermissions,
}
