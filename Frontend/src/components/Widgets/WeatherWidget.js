import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, TextField, Button, CircularProgress, Grid } from '@mui/material';

function WeatherWidget() {
  const [city, setCity] = useState('Johannesburg');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeatherData = async (city) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`/api/weather?city=${city}`); // Call the backend
      setWeatherData(response.data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch weather data. Please check the city name and try again.');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchWeatherData(city);
  }, [city]);

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleSearch = () => {
    const trimmedCity = city.trim();
    if (trimmedCity) {
      fetchWeatherData(trimmedCity);
    }
  };

  return (
    <Card sx={{ maxWidth: 400, margin: 'auto' }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Weather Widget
        </Typography>

        <TextField
          label="Enter City"
          variant="outlined"
          size="small"
          value={city}
          onChange={handleCityChange}
          sx={{ marginBottom: 2, width: '100%' }}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={handleSearch}
          disabled={loading}
          sx={{ width: '100%' }}
        >
          Get Weather
        </Button>

        {loading && <CircularProgress sx={{ marginTop: 2 }} />}

        {error && (
          <Typography color="error" sx={{ marginTop: 2 }}>
            {error}
          </Typography>
        )}

        {weatherData && !loading && !error && weatherData.weather && weatherData.main && (
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
