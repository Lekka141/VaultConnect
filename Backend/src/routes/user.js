const express = require('express');
const { body } = require('express-validator');
const { protect } = require('../controllers/authController');
const { getProfile, updateProfile } = require('../controllers/userController');

const router = express.Router();

router.use(protect);

router.get('/profile', getProfile);
router.put('/profile', [
  body('username').optional().isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),
  body('email').optional().isEmail().withMessage('Must be a valid email address')
], updateProfile);

module.exports = router;
