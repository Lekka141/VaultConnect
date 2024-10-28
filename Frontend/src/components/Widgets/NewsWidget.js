import React, { useState, useEffect } from 'react';
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

function NewsWidget() {
  const [query, setQuery] = useState('');
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchNews = async (query) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:5000/api/news?q=${query}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setArticles(data);
    } catch (err) {
      setError('Failed to fetch news. Please try again.');
    } finally {
      setLoading(false);
    }
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
    <Card sx={{ maxWidth: 400, margin: 'auto' }}>
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

        {loading && <CircularProgress sx={{ marginTop: 2, display: 'block', marginLeft: 'auto', marginRight: 'auto' }} />}

        {error && (
          <Typography color="error" sx={{ marginTop: 2 }}>
            {error}
          </Typography>
        )}

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
