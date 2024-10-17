import React, { useState } from 'react';
import { Box, Typography, TextField, Button, CircularProgress } from '@mui/material';
import { useAuth } from './AuthContext'; /** Importing AuthContext for authentication */
import GoogleIcon from '@mui/icons-material/Google';
import { useNavigate } from 'react-router-dom';

/**
 * SignIn component for user authentication using email/password or Google authentication.
 *
 * This component allows users to sign in using their credentials or Google OAuth.
 * The authentication logic is handled through the AuthContext.
 *
 * @returns {JSX.Element} - The rendered sign-in form
 */
const SignIn = () => {
  /** State variables to manage email, password, error messages, and loading state. */
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  /** Using signIn and signInWithGoogle functions from AuthContext */
  const { login, signInWithGoogle } = useAuth();
  const navigate = useNavigate(); /** Hook to navigate to different routes */

  /**
   * Handles form submission for sign-in with email and password.
   *
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
      setLoading(false);
      navigate('/dashboard'); /** Redirects to the dashboard upon successful sign-in */
    } catch (err) {
      setError('Invalid email or password. Please try again.');
      setLoading(false);
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
      setLoading(false);
      navigate('/dashboard'); /** Redirects to the dashboard upon successful Google sign-in */
    } catch (err) {
      setError('Google sign-in failed. Please check your connection and try again.');
      setLoading(false);
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
        src="/Images/Logo.png" /** Updated the path to be relative to the public directory */
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
          <Typography color="error" variant="body2" sx={{ mt: 1 }}>
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
          {loading ? <CircularProgress size={24} /> : 'Sign In'}
        </Button>
        <Button
          variant="outlined"
          color="primary"
          startIcon={<GoogleIcon />}
          onClick={handleGoogleSignIn}
          sx={{ mt: 2 }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : 'Sign In with Google'}
        </Button>
      </Box>
    </Box>
  );
};

export default SignIn;
