import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import API from '../../utils/API'; /** Assuming an API utility for backend interaction */

/**
 * SignUp component handles user registration functionality.
 * It provides input fields for the user to enter their name, email, and password, and submits these details
 * to register the user through an API request. On successful registration, the user is redirected to the sign-in page.
 */
function SignUp() {
  /** State variables for storing user input */
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); /** New state for password confirmation */
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  /** Hook to navigate the user to different routes */
  const navigate = useNavigate();

  /**
   * Handles the registration form submission.
   * Calls the backend API to register the user, and navigates to the sign-in page on success.
   *
   * @param {Object} e - The event object representing the form submission.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); /** Clear any previous error */

    /** Basic client-side validation */
    if (!email.includes('@') || !email.includes('.')) {
      setError('Please enter a valid email address.');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      /** Call the backend API for sign up with the user's name, email, and password */
      const response = await API.post('/signup', { name, email, password });

      if (response.data.success) {
        /** Navigate to the sign-in page upon successful registration */
        navigate('/signin');
      } else {
        /** Set an error message if registration was not successful */
        setError(response.data.message);
      }
    } catch (err) {
      /** Handle unexpected errors or network issues */
      setError(err.response?.data?.message || 'An error occurred. Please try again.');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          {/** Full name input field */}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Full Name"
            name="name"
            autoComplete="name"
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-label="Full Name" /** Added aria-label for accessibility */
          />
          {/** Email input field */}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-label="Email Address" /** Added aria-label for accessibility */
          />
          {/** Password input field */}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-label="Password" /** Added aria-label for accessibility */
          />
          {/** Confirm Password input field */}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            aria-label="Confirm Password" /** Added aria-label for accessibility */
          />
          {/** Display error message if registration fails */}
          {error && (
            <Typography color="error" variant="body2" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}
          {/** Submit button for registration */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default SignUp;
