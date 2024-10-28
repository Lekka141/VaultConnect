const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({ success: false, message: 'No token provided, authorization denied.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Store the decoded token in request for future use
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: 'Token is not valid.' });
  }
};

module.exports = authMiddleware;
