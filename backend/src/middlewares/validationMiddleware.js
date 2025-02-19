const { verifyToken } = require('../helpers/jwt');

const validateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'No se proporcionó un token' });
    }

    try {
        const decoded = verifyToken(token);
        req.user = decoded;
        next();
    } catch (error) {
    
        res.status(401).json({ error: 'Token inválido' });
    }
};

module.exports = { validateToken };