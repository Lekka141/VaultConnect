require('dotenv').config(); // Ensure dotenv is loaded first
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes'); // Adjust the path as necessary
const newsRoutes = require('./routes/newsRoutes'); // Add news API route
const weatherRoutes = require('./routes/weatherRoutes'); // Import weather routes
const financialNewsRoutes = require('./routes/financialNewsRoutes'); // Import the new route

// Initialize express app
const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS with options
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000', // Allow requests from frontend
    credentials: true, // If using cookies for authentication
}));

// Middleware
app.use(express.json());

// Function to connect to MongoDB
async function connectDB() {
    await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    console.log('MongoDB connected');
}

// Connect to MongoDB
connectDB().catch(err => {
    console.error('Failed to connect to MongoDB:', err.message);
    process.exit(1); // Exit the application if the DB connection fails
});

// Routes
app.use('/api', authRoutes); // Use auth routes
app.use('/api', newsRoutes); // Use news routes
app.use('/api', weatherRoutes); // Use weather routes
app.use('/api', financialNewsRoutes); // Add the financial news route

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
