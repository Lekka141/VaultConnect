import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Grid,
  TextField,
  Button,
  Pagination,
} from '@mui/material';

/**
 * FinancialNewsWidget component that fetches and displays financial news articles.
 * Allows users to input a search keyword and retrieve relevant financial news.
 * @returns {JSX.Element} - Rendered FinancialNewsWidget component.
 */
function FinancialNewsWidget() {
  /** State variables to manage news articles, loading status, error handling, search keyword, and pagination */
  const [news, setNews] = useState([]); /** Holds the list of news articles */
  const [loading, setLoading] = useState(false); /** Tracks if the API request is in progress */
  const [error, setError] = useState(null); /** Holds any error message */
  const [keyword, setKeyword] = useState('finance'); /** Default search keyword set to 'finance' */
  const [page, setPage] = useState(1); /** Tracks the current page for pagination */
  const [totalResults, setTotalResults] = useState(0); /** Holds the total number of results from the API */

  /** NewsAPI Key */
  const apiKey = '4fbef8e9a8894846bc6adf42ee1cbc89';

  /**
   * Fetch news articles from NewsAPI for the specified search keyword and page number.
   * @param {string} searchKeyword - The keyword to search for news articles.
   * @param {number} pageNumber - The current page number for pagination.
   */
  const fetchNews = async (searchKeyword = 'finance', pageNumber = 1) => {
    setLoading(true); /** Set loading to true when making the API request */
    setError(null); /** Clear previous errors */
    try {
      const response = await axios.get(
        `https://newsapi.org/v2/everything?q=${searchKeyword}&page=${pageNumber}&apiKey=${apiKey}`
      );
      setNews(response.data.articles); /** Store fetched news articles in news state */
      setTotalResults(response.data.totalResults); /** Set the total number of results from the API */
    } catch (err) {
      setError('Failed to fetch financial news. Please try again.'); /** Set error if the API request fails */
    }
    setLoading(false); /** Stop loading after the API request completes */
  };

  /** Fetch news when component mounts or when search keyword/page changes */
  useEffect(() => {
    fetchNews(keyword, page);
  }, [keyword, page]);

  /**
   * Handle changes in the search input field and update the state.
   * @param {object} event - The input change event.
   */
  const handleKeywordChange = (event) => {
    setKeyword(event.target.value); /** Update the search keyword state based on user input */
  };

  /** Trigger a new news fetch for the entered keyword */
  const handleSearch = () => {
    setPage(1); /** Reset to page 1 for a new search */
    fetchNews(keyword); /** Fetch news articles for the current keyword */
  };

  /**
   * Handle page change for pagination.
   * @param {object} event - The page change event.
   * @param {number} value - The new page number.
   */
  const handlePageChange = (event, value) => {
    setPage(value); /** Update the current page */
  };

  return (
    <Card sx={{ maxWidth: 800, margin: 'auto', padding: 2 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Financial News
        </Typography>

        {/* Search input for entering the search keyword */}
        <TextField
          label="Search Keyword"
          variant="outlined"
          size="small"
          value={keyword}
          onChange={handleKeywordChange}
          sx={{ marginBottom: 2, width: '100%' }}
        />

        {/* Button to trigger the search for news articles */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearch}
          disabled={loading}
          sx={{ marginBottom: 2, width: '100%' }}
        >
          Search
        </Button>

        {/* Display loading spinner if the request is in progress */}
        {loading && <CircularProgress sx={{ margin: '20px auto', display: 'block' }} />}

        {/* Display error message if any error occurs */}
        {error && (
          <Typography color="error" sx={{ marginBottom: 2 }}>
            {error}
          </Typography>
        )}

        {/* Display fetched news articles */}
        {news.length > 0 && !loading && !error && (
          <Grid container spacing={2}>
            {news.map((article, index) => (
              <Grid item xs={12} key={index}>
                <Card sx={{ backgroundColor: '#f9f9f9' }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {article.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" gutterBottom>
                      {article.source.name} - {new Date(article.publishedAt).toLocaleDateString()}
                    </Typography>
                    <Typography variant="body2">{article.description}</Typography>
                    <Button
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="outlined"
                      sx={{ marginTop: 2 }}
                    >
                      Read More
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {/* Pagination component to navigate between pages */}
        {totalResults > 20 && (
          <Pagination
            count={Math.ceil(totalResults / 20)}
            page={page}
            onChange={handlePageChange}
            sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}
          />
        )}
      </CardContent>
    </Card>
  );
}

export default FinancialNewsWidget;
