import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Box, CircularProgress } from '@mui/material';
import axios from 'axios';

/**
 * WeatherWidget component displays current weather information for a specified city.
 * It uses OpenWeather API to fetch weather data.
 *
 * @returns {JSX.Element} - The rendered weather widget
 */
const WeatherWidget = () => {
  /** State for storing weather data and loading status */
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  /** City for which to display the weather */
  const city = 'Cape Town';

  /** useEffect hook to fetch weather data from the OpenWeather API */
  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        setLoading(true);
        setError('');

        /** Fetch weather data using OpenWeather API */
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}&units=metric`
        );
        setWeather(response.data);
      } catch (err) {
        setError('Failed to fetch weather data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [city]);

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        {loading ? (
          /** Display a loading spinner while data is being fetched */
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <CircularProgress aria-label="Loading weather data" />
            <Typography sx={{ mt: 2 }}>Fetching weather data for {city}...</Typography>
          </Box>
        ) : error ? (
          /** Display an error message if data fetching fails */
          <Typography color="error" aria-label="Weather data error">
            {error}
          </Typography>
        ) : weather ? (
          /** Display weather information if data is successfully fetched */
          <Box>
            <Typography variant="h5" component="div">
              Weather in {weather.name}
            </Typography>
            <Typography variant="body2">
              Temperature: {weather.main.temp}°C
            </Typography>
            <Typography variant="body2">
              Condition: {weather.weather[0].description}
            </Typography>
            <Typography variant="body2">
              Humidity: {weather.main.humidity}%
            </Typography>
            <Typography variant="body2">
              Wind Speed: {weather.wind.speed} m/s
            </Typography>
          </Box>
        ) : (
          /** Fallback if no data is available */
          <Typography variant="body2" aria-label="No weather data available">
            No weather data available.
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default WeatherWidget;
