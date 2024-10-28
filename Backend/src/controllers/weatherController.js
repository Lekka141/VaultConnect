const axios = require('axios');

const apiKey = process.env.WEATHER_API_KEY; // Store your API key in the .env file

const fetchWeatherData = async (req, res) => {
    const { city } = req.query;

    if (!city) {
        return res.status(400).json({ error: 'City name is required' });
    }

    try {
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );

        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch weather data. Please check the city name and try again.' });
    }
};

module.exports = {
    fetchWeatherData,
};
