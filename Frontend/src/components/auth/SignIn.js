import React, { useState } from 'react';
import { Box, Typography, TextField, Button, CircularProgress } from '@mui/material';
import { useAuth } from './AuthContext'; /** Importing AuthContext for authentication */
import GoogleIcon from '@mui/icons-material/Google';
import { useNavigate } from 'react-router-dom';

/**
 * SignIn component for user authentication using email/password or Google authentication.
 * This component allows users to sign in using their credentials or Google OAuth.
 * The authentication logic is handled through the AuthContext.
 * @returns {JSX.Element} - The rendered sign-in form
 */
const SignIn = () => {
  /** State variables to manage email, password, error messages, and loading state. */
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  /** Using login and signInWithGoogle functions from AuthContext */
  const { login, signInWithGoogle } = useAuth();
  const navigate = useNavigate(); /** Hook to navigate to different routes */

  /**
   * Utility function to handle loading state for buttons.
   * @param {string} text - The text to display on the button.
   * @param {boolean} isLoading - Whether the button is in loading state.
   * @returns {JSX.Element} - The button content with or without a loading spinner.
   */
  const renderButtonContent = (text, isLoading) => (
    isLoading ? <CircularProgress size={24} /> : text
  );

  /**
   * Handles form submission for sign-in with email and password.
   * @param {object} e - The form submission event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(''); /** Clear any previous errors */

    /** Basic email validation to ensure the user provides a valid email address. */
    if (!email.includes('@') || !email.includes('.')) {
      setError('Please enter a valid email address.');
      setLoading(false);
      return;
    }

    try {
      await login(email, password);
      navigate('/dashboard'); /** Redirects to the dashboard upon successful sign-in */
    } catch (err) {
      setError('Invalid email or password. Please try again.');
    } finally {
      setLoading(false); /** Always reset loading state */
    }
  };

  /**
   * Handles sign-in with Google OAuth.
   */
  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(''); /** Clear any previous errors */

    try {
      await signInWithGoogle();
      navigate('/dashboard'); /** Redirects to the dashboard upon successful Google sign-in */
    } catch (err) {
      setError('Google sign-in failed. Please check your connection and try again.');
    } finally {
      setLoading(false); /** Always reset loading state */
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        bgcolor: 'background.default',
        padding: 3,
      }}
    >
      {/** VaultConnect Logo and Name */}
      <img
        src={require('../../Images/Logo.png')} /** Ensure proper path and importing image from src */
        alt="VaultConnect Logo"
        style={{ height: '80px', marginBottom: '16px' }}
      />
      <Typography variant="h4" gutterBottom>
        VaultConnect
      </Typography>

      {/** Sign-In Form */}
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: '100%',
          maxWidth: { xs: '90%', sm: '400px' }, /** Responsive width for different screen sizes */
          mt: 3,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <TextField
          label="Email"
          aria-label="email input"
          variant="outlined"
          fullWidth
          margin="normal"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!error && !email.includes('@')}
        />
        <TextField
          label="Password"
          type="password"
          aria-label="password input"
          variant="outlined"
          fullWidth
          margin="normal"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && (
          <Typography
            color="error"
            variant="body2"
            sx={{ mt: 1 }}
            aria-live="assertive" /** Ensure screen readers announce errors */
          >
            {error}
          </Typography>
        )}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          disabled={loading} /** Disable button while loading */
        >
          {renderButtonContent('Sign In', loading)}
        </Button>
        <Button
          variant="outlined"
          color="primary"
          startIcon={<GoogleIcon />}
          onClick={handleGoogleSignIn}
          sx={{ mt: 2 }}
          disabled={loading}
        >
          {renderButtonContent('Sign In with Google', loading)}
        </Button>
      </Box>
    </Box>
  );
};

export default SignIn;
