// src/app.js
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const compression = require('compression');
const errorHandler = require('./middlewares/errorHandler');
const routes = require('./routes');
const config = require('./config');
const logger = require('./utils/logger');

const app = express();

/* Enable CORS */
app.use(cors());

/* Set security HTTP headers */
app.use(helmet());

/* Development logging */
if (config.env === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined', { stream: logger.stream }));
}

/* Limit requests from same IP */
const limiter = rateLimit({
  max: 100, // limit each IP to 100 requests per windowMs
  windowMs: 15 * 60 * 1000, // 15 minutes
  message: 'Too many requests from this IP, please try again in 15 minutes!'
});
app.use('/api', limiter);

/* Body parser, reading data from body into req.body */
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

/* Data sanitization against NoSQL query injection */
app.use(mongoSanitize());

/* Data sanitization against XSS */
app.use(xss());

/* Prevent parameter pollution */
app.use(hpp({
  whitelist: [
    /* Add any parameters that you want to allow duplicates for */
    'widgetType'
  ]
}));

/* Compression middleware */
app.use(compression());

/* Routes */
app.use('/api', routes);

/* Default root route */
app.get('/', (req, res) => {
  res.send('Welcome to VaultConnect API');
});

/* Handle undefined routes */
app.all('*', (req, res, next) => {
  res.status(404).json({
    status: 'fail',
    message: `Can't find ${req.originalUrl} on this server!`
  });
});

/* Error handling middleware */
app.use(errorHandler);

module.exports = app;
