import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  CircularProgress,
  List,
  ListItem,
  ListItemText
} from '@mui/material';

/**
 * NewsWidget component that fetches and displays news articles based on a user's query.
 * Allows users to enter a search keyword to retrieve relevant news.
 * @returns {JSX.Element} - Rendered NewsWidget component.
 */
function NewsWidget() {
  /** State variables to manage the news query, articles, loading status, and error handling */
  const [query, setQuery] = useState(''); /** The user's search query */
  const [articles, setArticles] = useState([]); /** Holds the list of news articles */
  const [loading, setLoading] = useState(false); /** Tracks if the API request is in progress */
  const [error, setError] = useState(null); /** Holds any error message */

  /** NewsAPI Key */
  const apiKey = process.env.REACT_APP_NEWS_API_KEY || '4fbef8e9a8894846bc6adf42ee1cbc89';

  /**
   * Fetch news articles from NewsAPI based on the user's query.
   * @param {string} query - The search keyword to fetch relevant news articles.
   */
  const fetchNews = async (query) => {
    setLoading(true); /** Set loading to true when making the API request */
    setError(null); /** Clear previous errors */
    try {
      const response = await axios.get(
        `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}`
      );
      setArticles(response.data.articles); /** Store fetched news articles in articles state */
    } catch (err) {
      setError('Failed to fetch news. Please try again.'); /** Set error if the API request fails */
    }
    setLoading(false); /** Stop loading after the API request completes */
  };

  /** Fetch default news on component mount */
  useEffect(() => {
    fetchNews('latest');
  }, []);

  /**
   * Handle the change in the search input field and update the query state.
   * @param {object} event - The input change event.
   */
  const handleQueryChange = (event) => {
    setQuery(event.target.value); /** Update the query state based on user input */
  };

  /** Trigger a new news fetch based on the entered query */
  const handleSearch = () => {
    if (query.trim() !== '') {
      fetchNews(query); /** Fetch news articles for the current query */
    }
  };

  return (
    <Card sx={{ maxWidth: 400, margin: 'auto' }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          News Widget
        </Typography>

        {/* Input field for the user to enter a search query */}
        <TextField
          label="Search News"
          variant="outlined"
          size="small"
          value={query}
          onChange={handleQueryChange}
          sx={{ marginBottom: 2, width: '100%' }}
        />

        {/* Button to trigger the search for news articles */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearch}
          disabled={loading}
          sx={{ width: '100%' }}
        >
          Search
        </Button>

        {/* Display loading spinner if the request is in progress */}
        {loading && <CircularProgress sx={{ marginTop: 2, display: 'block', marginLeft: 'auto', marginRight: 'auto' }} />}

        {/* Display error message if any error occurs */}
        {error && (
          <Typography color="error" sx={{ marginTop: 2 }}>
            {error}
          </Typography>
        )}

        {/* Display the fetched news articles */}
        {!loading && !error && articles.length > 0 && (
          <List>
            {articles.slice(0, 5).map((article, index) => (
              <ListItem key={index} alignItems="flex-start">
                <ListItemText
                  primary={article.title}
                  secondary={
                    <>
                      <Typography
                        component="span"
                        variant="body2"
                        color="textSecondary"
                      >
                        {article.source.name} - {new Date(article.publishedAt).toLocaleDateString()}
                      </Typography>
                    </>
                  }
                />
              </ListItem>
            ))}
          </List>
        )}
      </CardContent>
    </Card>
  );
}

export default NewsWidget;
