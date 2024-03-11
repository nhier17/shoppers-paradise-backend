const BadRequest = require('./badRequest');
const CustomError = require('./customError');
const Unauthenticated = require('./unauthenticated');
const UnauthorizedError = require('./unauthorized');
const NotFoundError = require('./not-found')

module.exports = {
    BadRequest,
    CustomError,
    Unauthenticated,
    UnauthorizedError,
    NotFoundError,
}