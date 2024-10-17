import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, TextField, Button, CircularProgress, Grid } from '@mui/material';

/**
 * WeatherWidget component that fetches and displays weather information for a given city.
 * Allows users to input a city name and retrieve its current weather information.
 * @returns {JSX.Element} - Rendered WeatherWidget component.
 */
function WeatherWidget() {
  /** State variables to manage city, weather data, loading status, and error handling */
  const [city, setCity] = useState('Johannesburg');  /** Default city set to Johannesburg */
  const [weatherData, setWeatherData] = useState(null);  /** Holds the weather data */
  const [loading, setLoading] = useState(false);  /** Tracks if the API request is in progress */
  const [error, setError] = useState(null);  /** Holds any error message */

  /** OpenWeatherMap API Key */
  const apiKey = 'c2201704c24e9a5fbf114d5629d66e10';

  /**
   * Fetch weather data from OpenWeather API for the specified city.
   * @param {string} city - The name of the city for which to fetch weather data.
   */
  const fetchWeatherData = async (city) => {
    setLoading(true);  /** Set loading to true when making the API request */
    setError(null);  /** Clear previous errors */
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      setWeatherData(response.data);  /** Store fetched data in weatherData state */
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.');  /** Set error if the API request fails */
    }
    setLoading(false);  /** Stop loading after the API request completes */
  };

  /** Fetch the default weather data for the default city on component mount */
  useEffect(() => {
    fetchWeatherData(city);
  }, []);

  /**
   * Handle changes in the city input field and update the state.
   * @param {object} event - The input change event.
   */
  const handleCityChange = (event) => {
    setCity(event.target.value);  /** Update the city state based on user input */
  };

  /** Trigger a new weather data fetch for the entered city */
  const handleSearch = () => {
    if (city) {
      fetchWeatherData(city);  /** Fetch weather data for the current city */
    }
  };

  return (
    <Card sx={{ maxWidth: 400, margin: 'auto' }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Weather Widget
        </Typography>

        {/* Input field for the user to enter a city */}
        <TextField
          label="Enter City"
          variant="outlined"
          size="small"
          value={city}
          onChange={handleCityChange}
          sx={{ marginBottom: 2, width: '100%' }}
        />

        {/* Button to fetch weather data for the specified city */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearch}
          disabled={loading}
          sx={{ width: '100%' }}
        >
          Get Weather
        </Button>

        {/* Display loading spinner if the request is in progress */}
        {loading && <CircularProgress sx={{ marginTop: 2 }} />}

        {/* Display error message if any error occurs */}
        {error && (
          <Typography color="error" sx={{ marginTop: 2 }}>
            {error}
          </Typography>
        )}

        {/* Display the fetched weather data */}
        {weatherData && !loading && !error && (
          <Grid container spacing={2} sx={{ marginTop: 2 }}>
            <Grid item xs={12}>
              <Typography variant="h6">{weatherData.name}</Typography>
              <Typography variant="body1">{weatherData.weather[0].description}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2">Temperature: {weatherData.main.temp}°C</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2">Feels like: {weatherData.main.feels_like}°C</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2">Humidity: {weatherData.main.humidity}%</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2">Wind Speed: {weatherData.wind.speed} m/s</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2">Min Temp: {weatherData.main.temp_min}°C</Typography>
              <Typography variant="body2">Max Temp: {weatherData.main.temp_max}°C</Typography>
            </Grid>
          </Grid>
        )}
      </CardContent>
    </Card>
  );
}

export default WeatherWidget;
