import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Box, CircularProgress } from '@mui/material';
import axios from 'axios';

/**
 * FinancialNewsWidget component displays the latest financial news headlines.
 * It fetches data from a financial news API.
 *
 * @returns {JSX.Element} - The rendered financial news widget
 */
const FinancialNewsWidget = () => {
  /** State for storing news data and loading status */
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  /** useEffect hook to fetch financial news data from an API */
  useEffect(() => {
    const fetchNewsData = async () => {
      try {
        setLoading(true);
        setError('');

        /** Fetch news data using an environment variable for the API key */
        const response = await axios.get(
          `https://newsapi.org/v2/top-headlines?category=business&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`
        );
        setNews(response.data.articles);
      } catch (err) {
        setError('Failed to fetch news data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchNewsData();
  }, []);

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        {loading ? (
          /** Display a loading spinner while data is being fetched */
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <CircularProgress aria-label="Loading news data" />
            <Typography sx={{ mt: 2 }}>Fetching the latest financial news...</Typography>
          </Box>
        ) : error ? (
          /** Display an error message if data fetching fails */
          <Typography color="error" aria-label="News data error">
            {error}
          </Typography>
        ) : news.length > 0 ? (
          /** Display news headlines if data is successfully fetched */
          <Box>
            <Typography variant="h5" component="div" gutterBottom>
              Financial News
            </Typography>
            {news.slice(0, 5).map((article, index) => (
              <Box key={index} sx={{ mb: 2 }}>
                <Typography variant="h6">{article.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {article.source.name}
                </Typography>
                {article.url && (
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Read more about ${article.title}`}
                  >
                    Read more
                  </a>
                )}
              </Box>
            ))}
          </Box>
        ) : (
          /** Fallback if no news data is available */
          <Typography variant="body2" aria-label="No news data available">
            No news available at the moment.
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default FinancialNewsWidget;
