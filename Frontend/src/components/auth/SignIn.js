import React, { useState } from 'react';
import { Box, Typography, TextField, Button, CircularProgress } from '@mui/material';
import { useAuth } from './AuthContext'; // Importing AuthContext for authentication

const SignIn = () => {
  // State to hold email, password, error messages, and loading state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth(); // Using the signIn function from AuthContext

  // Handle form submission for sign-in
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(''); // Clear any previous errors

    // Basic email validation
    if (!email.includes('@') || !email.includes('.')) {
      setError('Please enter a valid email address.');
      setLoading(false);
      return;
    }

    signIn(email, password)
      .then(() => {
        setLoading(false);
        // Navigate to dashboard handled by the authentication state change
      })
      .catch(() => {
        setError('Invalid email or password. Please try again.');
        setLoading(false);
      });
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
      {/* VaultConnect Logo and Name */}
      <img src="/path/to/logo.png" alt="VaultConnect Logo" style={{ height: '80px', marginBottom: '16px' }} />
      <Typography variant="h4" gutterBottom>
        VaultConnect
      </Typography>

      {/* Sign-In Form */}
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: '100%',
          maxWidth: { xs: '90%', sm: '400px' }, // Responsive width for different screen sizes
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
          disabled={loading} // Disable button while loading
        >
          {loading ? <CircularProgress size={24} /> : 'Sign In'}
        </Button>
      </Box>
    </Box>
  );
};

export default SignIn;
