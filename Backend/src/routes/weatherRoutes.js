const express = require('express');
const { fetchWeatherData } = require('../controllers/weatherController');

const router = express.Router();

router.get('/weather', fetchWeatherData); // Define the endpoint

module.exports = router;
