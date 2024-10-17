import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Box, CircularProgress } from '@mui/material';
import axios from 'axios';

/**
 * RSSFeedWidget component displays the latest headlines from a specified RSS feed.
 * It uses an external RSS feed API to fetch data.
 *
 * @returns {JSX.Element} - The rendered RSS feed widget
 */
const RSSFeedWidget = () => {
  /** State for storing RSS feed data and loading status */
  const [feed, setFeed] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  /** RSS feed URL to fetch data from */
  const rssUrl = 'https://rss.cnn.com/rss/edition.rss';

  /** useEffect hook to fetch RSS feed data from an external API */
  useEffect(() => {
    const fetchFeedData = async () => {
      try {
        setLoading(true);
        setError('');

        /** Fetch RSS feed data using a proxy service and environment variable for API key */
        const response = await axios.get(
          `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}&api_key=${process.env.REACT_APP_RSS_API_KEY}`
        );
        setFeed(response.data.items);
      } catch (err) {
        setError('Failed to fetch RSS feed data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchFeedData();
  }, [rssUrl]);

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        {loading ? (
          /** Display a loading spinner while data is being fetched */
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <CircularProgress aria-label="Loading RSS feed data" />
            <Typography sx={{ mt: 2 }}>Fetching the latest news...</Typography>
          </Box>
        ) : error ? (
          /** Display an error message if data fetching fails */
          <Typography color="error" aria-label="RSS feed error">
            {error}
          </Typography>
        ) : feed.length > 0 ? (
          /** Display RSS feed items if data is successfully fetched */
          <Box>
            <Typography variant="h5" component="div" gutterBottom>
              Latest News
            </Typography>
            {feed.slice(0, 5).map((item, index) => (
              <Box key={index} sx={{ mb: 2 }}>
                <Typography variant="h6">{item.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {new Date(item.pubDate).toLocaleDateString()} {/* Format publication date */}
                </Typography>
                {item.link && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Read more about ${item.title}`}
                  >
                    Read more
                  </a>
                )}
              </Box>
            ))}
          </Box>
        ) : (
          /** Fallback if no RSS feed data is available */
          <Typography variant="body2" aria-label="No RSS feed data available">
            No feed data available at the moment.
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default RSSFeedWidget;
