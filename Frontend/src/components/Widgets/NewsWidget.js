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
  ListItemText,
  CardActions,
} from '@mui/material';

/**
 * NewsWidget component that fetches and displays news articles based on a user's query.
 * Allows users to enter a search keyword to retrieve relevant news.
 * @returns {JSX.Element} - Rendered NewsWidget component.
 */
function NewsWidget() {
  const [query, setQuery] = useState(''); 
  const [articles, setArticles] = useState([]); 
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null); 

  const apiKey = process.env.REACT_APP_NEWS_API_KEY || '4fbef8e9a8894846bc6adf42ee1cbc89';

  const fetchNews = async (query) => {
    setLoading(true);
    setError(null); 
    try {
      const response = await axios.get(
        `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}`
      );
      setArticles(response.data.articles); 
    } catch (err) {
      setError('Failed to fetch news. Please try again.');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchNews('latest');
  }, []);

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSearch = () => {
    if (query.trim() !== '') {
      fetchNews(query);
    }
  };

  return (
    <Card sx={{ maxWidth: 500, margin: '20px auto', height: '100%', overflowY: 'auto' }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          News Widget
        </Typography>

        <TextField
          label="Search News"
          variant="outlined"
          size="small"
          value={query}
          onChange={handleQueryChange}
          sx={{ marginBottom: 2, width: '100%' }}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={handleSearch}
          disabled={loading}
          sx={{ width: '100%' }}
        >
          Search
        </Button>

        {loading && (
          <CircularProgress sx={{ marginTop: 2, display: 'block', marginLeft: 'auto', marginRight: 'auto' }} />
        )}

        {error && (
          <Typography color="error" sx={{ marginTop: 2 }}>
            {error}
          </Typography>
        )}

        {!loading && !error && articles.length > 0 && (
          <List>
            {articles.slice(0, 5).map((article, index) => (
              <ListItem key={index} alignItems="flex-start" sx={{ marginBottom: 2 }}>
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
                      <Typography variant="body2" sx={{ marginTop: 1 }}>
                        {article.description ? article.description.substring(0, 100) + '...' : ''}
                      </Typography>
                      {article.url && (
                        <CardActions>
                          <Button
                            href={article.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            variant="outlined"
                            size="small"
                            sx={{ marginTop: 1 }}
                          >
                            Read More
                          </Button>
                        </CardActions>
                      )}
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
