const jwt = require('jsonwebtoken'); // Import the jsonwebtoken library for handling JWT
const User = require('../models/User'); // Import the User model to access user data

const protect = async (req, res, next) => {
  let token; // Variable to store the JWT
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

   // If no token is provided, respond with a 401 status and an error message
  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protect };
