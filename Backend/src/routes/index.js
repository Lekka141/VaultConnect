const express = require('express');
const authRoutes = require('./auth');
const userRoutes = require('./user');
const widgetRoutes = require('./widget');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/widgets', widgetRoutes);

module.exports = router;
