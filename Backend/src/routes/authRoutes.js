const express = require('express');
const { signup, signin } = require('../controllers/AuthController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// POST /api/signup - Register a new user
router.post('/signup', signup);

// POST /api/signin - Sign in an existing user
router.post('/signin', signin);

// Example of a protected route
router.get('/protected', authMiddleware, (req, res) => {
  res.status(200).json({ success: true, message: 'You have accessed a protected route!', user: req.user });
});

module.exports = router;

