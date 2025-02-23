const jwt = require("jsonwebtoken");
require('dotenv').config();

const { JWT_SECRET } = process.env
const signToken = (data) => {
    return jwt.sign(
        data,
        String(JWT_SECRET),
        {
            algorithm: 'HS384',
            expiresIn: '1h'
        })
};

const verifyToken = (token) => {
    return jwt.verify(token, String(JWT_SECRET));
};

const getHeadersToken = (req) => {
    const Authorization = req.header("Authorization")

    return Authorization.split("Bearer ")[1] // "Bearer <token>" [bearer, token]
}

module.exports = { 
    signToken,
    verifyToken , 
    getHeadersToken
} 