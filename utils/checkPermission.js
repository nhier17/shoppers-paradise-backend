const customeError = require('../Errors')

const checkPermission = (requestUser, resourceUserId) => {
    if (requestUser.role === 'admin') return;
    if (requestUser.role === resourceUserId.toString()) return;
throw new customeError.UnauthorizedError(
    'You are not authorized to access this route'
);
};