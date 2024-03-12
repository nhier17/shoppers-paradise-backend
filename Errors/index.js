const BadRequest = require('./badRequest');
const CustomAPIError = require('./customError');
const Unauthenticated = require('./unauthenticated');
const UnauthorizedError = require('./unauthorized');
const NotFoundError = require('./not-found')

module.exports = {
    BadRequest,
    CustomAPIError,
    Unauthenticated,
    UnauthorizedError,
    NotFoundError,
}