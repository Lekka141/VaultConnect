const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

/**
 * Sign up a new user
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 */
exports.signup = async (req, res) => {
  const { name, username, email, password } = req.body;

  // Check for existing user by username or email
  const existingUser = await User.findOne({ $or: [{ email }, { username }] });
  if (existingUser) {
    return res.status(400).json({ success: false, message: 'Username or email already exists.' });
  }

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create new user with hashed password
  const newUser = new User({ name, username, email, password: hashedPassword });

  try {
    await newUser.save();

    // Generate JWT token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ success: true, message: 'User registered successfully.', token, username: newUser.username });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error registering user.' });
  }
};

/**
 * Sign in an existing user
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 */
exports.signin = async (req, res) => {
  const { usernameOrEmail, password } = req.body;

  try {
    // Find user by username or email
    const user = await User.findOne({
      $or: [{ email: usernameOrEmail }, { username: usernameOrEmail }],
    });

    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid username or email.' });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid password.' });
    }

    // Generate a new JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ success: true, message: 'Sign in successful.', token, username: user.username });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error signing in user.' });
  }
};