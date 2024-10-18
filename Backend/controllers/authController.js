const User = require('../models/User'); // Import the User model to interact with user data
const { generateToken } = require('../config/jwt'); // Import the function to generate JWTs

// Controller function to handle user registration
exports.register = async (req, res) => {
  try {
    // Destructure username, email, and password from request body
    const { username, email, password } = req.body;
    // Create a new user in the database
    const user = await User.create({ username, email, password });
    // Generate a token for the newly registered user
    const token = generateToken(user._id);
    // Respond with status 201 and the user data along with the token
    res.status(201).json({ user: { id: user._id, username, email }, token });
  } catch (error) {
    // If registration fails, respond with status 400 and error message
    res.status(400).json({ message: 'User registration failed', error: error.message });
  }
};

// Controller function to handle user login
exports.login = async (req, res) => {
  try {
    // Destructure email and password from request body
    const { email, password } = req.body;
    // Find the user by email
    const user = await User.findOne({ email });
    // Check if user exists and password matches
    if (user && (await user.matchPassword(password))) {
      // Generate a token for the authenticated user
      const token = generateToken(user._id);
      // Respond with the user data and token
      res.json({ user: { id: user._id, username: user.username, email }, token });
    } else {
      // If email or password is invalid, respond with status 401
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    // If login fails, respond with status 500 and error message
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
};

// Controller function to handle user logout
exports.logout = (req, res) => {
  // Respond with a success message for logout
  res.json({ message: 'Logout successful' });
};
