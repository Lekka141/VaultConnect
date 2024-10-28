const express = require('express');
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('90451f4d244647349f4b15bc1c7af4d5');

const router = express.Router();

router.get('/news', async (req, res) => {
  const query = req.query.q || 'latest';
  try {
    const response = await newsapi.v2.everything({
      q: query,
      language: 'en',
      sortBy: 'relevancy',
    });
    res.json(response.articles);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

module.exports = router;
