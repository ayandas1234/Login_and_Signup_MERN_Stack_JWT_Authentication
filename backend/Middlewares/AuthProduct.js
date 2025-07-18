const jwt = require('jsonwebtoken');

const ensureAuthenticated = (req, res, next) => {
    const auth = req.headers['authorization'];// gets the full header from HTTP header
    if (!auth) {
        return res.status(403).json({ message: 'Unauthorized, jwt token is require' });
    }

    // const token = auth.startsWith('Bearer ') ? auth.split(' ')[1] : null;

    // if (!token) {
    //     return res.status(403).json({ message: 'Unauthorized, Invalid token format' });
    // }

    try {
        const decoded = jwt.verify(auth, process.env.JWT_SECRET); // verify and decode
        req.user = decoded; // save user info for further use in routes
        next(); // allow access to the next middleware or route
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized, Invalid or expired token' });
    }
}

module.exports = ensureAuthenticated;