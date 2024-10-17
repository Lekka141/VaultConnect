const express = require('express');
const router = express.Router();

// Import the controller functions
const { Signup, Login, Logout } = require('../controllers/AuthController');

// Define routes with the updated names
router.post('/signup', Signup);  // Signup route
router.post('/login', Login);    // Login route
router.post('/logout', Logout);  // Logout route

module.exports = router;
