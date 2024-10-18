const express = require('express'); // Import the Express framework for building web applications
const jwt = require('jsonwebtoken'); // Import the jsonwebtoken library to create, sign, and verify JWTs
const rateLimit = require('express-rate-limit'); // Import express-rate-limit to limit the number of requests from a single IP address

const authMiddleware = (req, res, next) => {
    // Get token from headers and handle Bearer format
    const token = req.header('Authorization')?.split(' ')[1]; // Split "Bearer <token>"

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach the user information to the request object
        req.user = decoded.user;

        // Proceed to the next middleware or route handler
        next();
    } catch (err) {
        console.error('Token verification failed:', err); // Log for debugging
        res.status(401).json({ message: 'Token is not valid' });
    }
};

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit to 100 requests per windowMs
});

module.exports = { authMiddleware, limiter };
