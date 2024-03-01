const JWT = require('jsonwebtoken')

const createJWT = ({ payload }) => {
    const token = JWT.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_LIFETIME,
    });
    return token;
}

const isTokenValid = ({ token }) => JWT.verify(token, process.env.JWT_SECRET);

const attachCookiesToResponse = ({ res, user}) => {
    const token = createJWT({payload: user});
    const oneDay = 1000 * 60 * 60 * 24;

    res.cookie('token', token, {
        expires: new Date(Date.now() + oneDay),
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        signed: true,
    });
}

module.exports = {
    createJWT,
    isTokenValid,
    attachCookiesToResponse,
}