const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const { authMiddleware, limiter } = require('./middleware/AuthMiddleware'); // Ensure the path is correct
require('dotenv').config(); // Load environment variables from .env

// Initialize express app
const app = express();

// Enable CORS with options
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000', // Allow requests from frontend
    credentials: true, // If using cookies for authentication
}));

// Connect to MongoDB
connectDB().catch(err => {
    console.error('Failed to connect to MongoDB:', err.message);
    process.exit(1); // Exit the application if the DB connection fails
});

// Middleware to parse incoming JSON data
app.use(express.json()); // This allows your API to accept and parse JSON data

// Apply rate limiting to all API routes
app.use('/api', limiter); // Ensure limiter is defined before this line

// Routes
const userRoutes = require('./routes/userRoutes'); // Ensure correct path and export
const fileRoutes = require('./routes/fileRoutes'); // Ensure correct path and export
const calendarRoutes = require('./routes/calendarRoutes'); // Ensure correct path and export
const widgetRoutes = require('./routes/widgetsRoutes'); // Ensure correct path and export

// Apply authMiddleware to protected routes
app.use('/api/users', authMiddleware, userRoutes);
app.use('/api/files', authMiddleware, fileRoutes);
app.use('/api/calendar', authMiddleware, calendarRoutes);
app.use('/api/widgets', authMiddleware, widgetRoutes);

// Root route - simple message to indicate the API is running
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Health check route for monitoring server health status
app.get('/health', (req, res) => {
    res.status(200).send('Server is healthy');
});

// Fallback for handling undefined routes
app.use((req, res, next) => {
    res.status(404).json({ message: 'Route not found' });
});

// Global error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: 'Internal Server Error',
        error: err.message,
    });
});

// Define the PORT from the .env file, or fallback to 5000
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
