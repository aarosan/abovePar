const jwt = require('jsonwebtoken');
require('dotenv').config(); 

const secret = process.env.JWT_SECRET_KEY || 'default_secret';

function authMiddleware(req, res, next) {

    const nonAuthRoutes = ['/', '/login', '/signup'];

    if (nonAuthRoutes.includes(req.path)) {
        return next();
    }

    let token = req.body.token || req.query.token || req.headers.authorization;

    if (req.headers.authorization && token.startsWith('Bearer ')) {
        token = token.slice(7);
    }


    console.log('authMiddleware Token', token);

    if (!token) {
        return next();
    }

    try {
        const decoded = jwt.verify(token, secret);
        req.user = decoded.data;
        next();
    } catch (error) {
        console.error('Error in authentication:', error);
        // req.user = null;
        res.status(401).json({ message: 'Invalid token' });
    }
}

function signToken(user) {
    const { email, _id } = user;
    console.log('Signing token for user:', email, _id);

    const payload = { email, _id };
    const token = jwt.sign({ data: payload }, secret);

    console.log('Generated token:', token);

    return token;
}

module.exports = { authMiddleware, signToken };