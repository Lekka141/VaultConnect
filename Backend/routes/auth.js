const express = require('express'); // Import the Express framework
const { register, login, logout } = require('../controllers/authController'); // Import authentication controller functions
const router = express.Router(); // Create a new router instance for handling routes

// Route for user registration
router.post('/register', register); // Handle POST requests to /register with the register function

// Route for user login
router.post('/login', login); // Handle POST requests to /login with the login function

// Route for user logout
router.post('/logout', logout); // Handle POST requests to /logout with the logout function

module.exports = router; // Export the router for use in other parts of the application