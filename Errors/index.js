const BadRequest = require('./badRequest');
const CustomeError = require('./customeError');
const Unauthenticated = require('./unauthenticated');
const UnauthorizedError = require('./unauthorized');
const NotFoundError = require('./not-found')

module.exports = {
    BadRequest,
    CustomeError,
    Unauthenticated,
    UnauthorizedError,
    NotFoundError,
}