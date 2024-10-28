const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true, // Ensuring username is unique
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensuring email is unique
  },
  password: {
    type: String,
    required: true,
  },
}, { timestamps: true });  // Enable timestamps to automatically add createdAt and updatedAt fields

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
