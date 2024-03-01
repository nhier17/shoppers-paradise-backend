const CustomeError = require('../Errors')
const { isTokenValid } = require('../utils/jwt')

//authenticate the user
const authenticateUser = (req,res,next) => {
    let token;
    // check headers
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startswith('Bearer ')) {
        token = authHeader.split(' ')[1]
        
    } else if (req.cookies.token) {
        token = req.cookies.token
    }
    if (!token) {
        throw new CustomeError.Unauthenticated("Authentication invalid")
    }
    try {
      const payload = isTokenValid(token)
      //attach user and permissions to req.object
      req.user = {
        userId: payload.user.userId,
        role: payload.user.role,
      }  
      next()
    } catch (error) {
        throw new CustomeError.UnauthorizedError('Unauthorized to access this route')
    }
//authorize roles 
const authoriseRoles = (...roles) => {
    return (req,res,next) => {
        if(!roles.includes(req.user.role)) {
            throw new CustomeError.UnauthorizedError('Unauthorized to access this route')
        }
    }
    next()
}
}
module.exports = {
    authenticateUser,
    authoriseRoles
}