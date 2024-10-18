const mongoose = require('mongoose'); // Import mongoose to interact with MongoDB
const bcrypt = require('bcryptjs'); // Import bcrypt for hashing passwords

// Define the User schema
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true }, // Username field, must be unique
  email: { type: String, required: true, unique: true }, // Email field, must be unique
  password: { type: String, required: true }, // Password field, required for registration
  widgets: { type: Object, default: {} } // Field for user widgets, default to an empty object
}, { timestamps: true }); // Enable timestamps for createdAt and updatedAt fields

// Pre-save middleware to hash the password before saving the user
UserSchema.pre('save', async function(next) {
  // If the password is not modified, proceed to the next middleware
  if (!this.isModified('password')) return next();
  // Hash the password with a salt round of 12
  this.password = await bcrypt.hash(this.password, 12);
  next(); // Proceed to the next middleware
});

// Instance method to compare an entered password with the hashed password
UserSchema.methods.matchPassword = async function(enteredPassword) {
  // Compare the entered password with the stored hashed password
  return await bcrypt.compare(enteredPassword, this.password);
};

// Create the User model based on the User schema
const User = mongoose.model('User', UserSchema);
module.exports = User; // Export the User model for use in other files
