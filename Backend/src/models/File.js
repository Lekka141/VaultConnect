const mongoose = require('mongoose'); // Import mongoose to interact with MongoDB

// Define the schema for files
const fileSchema = new mongoose.Schema({
  filename: {
    type: String, // Name of the file
    required: true, // Filename is a required field
    unique: true, // Filename must be unique
  },
  filepath: {
    type: String, // Path where the file is stored
    required: true, // Filepath is a required field
  },
  user: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the User model
    ref: 'User', // Assumes a User model exists
    required: true, // User reference is a required field
  },
  size: {
    type: Number, // Size of the file in bytes
    required: true, // Size is a required field
  },
  type: {
    type: String, // MIME type of the file (e.g., 'image/png', 'application/pdf')
    required: true, // Type is a required field
  },
  // Add more fields as needed for your specific use case
});

// Create the File model based on the file schema
const File = mongoose.model('File', fileSchema);

// Export the File model for use in other parts of the application
module.exports = File; // Use CommonJS export