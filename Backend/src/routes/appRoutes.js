const express = require('express');
const router = express.Router();
const { healthCheck, appInfo } = require('../controllers/appController');

// Health check route
router.get('/health', healthCheck);

// App information route
router.get('/info', appInfo);

module.exports = router;

