class AppError extends Error {
  constructor(message, statusCode) {
    super(message); // Call the parent Error constructor with the error message
    this.statusCode = statusCode; // Set the HTTP status code for the error
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
