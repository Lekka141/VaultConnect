import React, { useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, TextField, Button, CircularProgress, Grid } from '@mui/material';

/**
 * RSSFeedWidget component that fetches and displays RSS feed items from a given URL.
 * Allows users to input an RSS feed URL and retrieve its latest articles.
 * @returns {JSX.Element} - Rendered RSSFeedWidget component.
 */
function RSSFeedWidget() {
  /** State variables to manage RSS feed URL, feed data, loading status, and error handling */
  const [rssUrl, setRssUrl] = useState('');  /** The RSS feed URL entered by the user */
  const [feedData, setFeedData] = useState([]);  /** Holds the list of RSS feed items */
  const [loading, setLoading] = useState(false);  /** Tracks if the API request is in progress */
  const [error, setError] = useState(null);  /** Holds any error message */

  /**
   * Fetch RSS feed data from rss2json API for the specified URL.
   * @param {string} rssUrl - The URL of the RSS feed to fetch.
   */
  const fetchRSSFeed = async (rssUrl) => {
    setLoading(true);  /** Set loading to true when making the API request */
    setError(null);  /** Clear previous errors */
    try {
      const response = await axios.get(`https://api.rss2json.com/v1/api.json?rss_url=${rssUrl}`);
      setFeedData(response.data.items);  /** Store fetched RSS feed items in feedData state */
    } catch (err) {
      setError('Failed to fetch RSS feed. Please check the URL.');  /** Set error if the API request fails */
    }
    setLoading(false);  /** Stop loading after the API request completes */
  };

  /**
   * Handle changes in the RSS feed URL input field and update the state.
   * @param {object} event - The input change event.
   */
  const handleUrlChange = (event) => {
    setRssUrl(event.target.value);  /** Update the RSS feed URL state based on user input */
  };

  /** Trigger a new RSS feed data fetch for the entered URL */
  const handleFetch = () => {
    if (rssUrl) {
      fetchRSSFeed(rssUrl);  /** Fetch RSS feed data for the current URL */
    }
  };

  return (
    <Card sx={{ maxWidth: 400, margin: 'auto' }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          RSS Feed Widget
        </Typography>

        {/* Input field for the user to enter an RSS feed URL */}
        <TextField
          label="Enter RSS Feed URL"
          variant="outlined"
          size="small"
          value={rssUrl}
          onChange={handleUrlChange}
          sx={{ marginBottom: 2, width: '100%' }}
        />

        {/* Button to fetch the RSS feed for the specified URL */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleFetch}
          disabled={loading}
          sx={{ width: '100%' }}
        >
          Get RSS Feed
        </Button>

        {/* Display loading spinner if the request is in progress */}
        {loading && <CircularProgress sx={{ marginTop: 2 }} />}

        {/* Display error message if any error occurs */}
        {error && (
          <Typography color="error" sx={{ marginTop: 2 }}>
            {error}
          </Typography>
        )}

        {/* Display the fetched RSS feed data */}
        {feedData.length > 0 && (
          <Grid container spacing={2} sx={{ marginTop: 2 }}>
            {feedData.map((item, index) => (
              <Grid item xs={12} key={index}>
                <Typography variant="h6">{item.title}</Typography>
                <Typography variant="body2">{item.pubDate}</Typography>
                <Typography variant="body1">{item.description}</Typography>
              </Grid>
            ))}
          </Grid>
        )}
      </CardContent>
    </Card>
  );
}

export default RSSFeedWidget;
