const express = require('express');
const axios = require('axios');
const router = express.Router();

const API_KEY = process.env.NEWS_API_KEY; // Ensure you have the API key in your .env file

// Route to get financial news
router.get('/financial-news', async (req, res) => {
  try {
    const response = await axios.get(`https://newsapi.org/v2/top-headlines?category=business&apiKey=${API_KEY}`);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching financial news:', error.message);
    res.status(500).json({ message: 'Failed to fetch financial news' });
  }
});

module.exports = router;
