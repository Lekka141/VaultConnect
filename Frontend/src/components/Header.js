import React, { useContext } from 'react';
import { Typography, Box } from '@mui/material';
import { AuthContext } from './auth/AuthContext';

/**
 * Header component displays a prominent heading for the dashboard page.
 * It helps users understand the main purpose of the page.
 *
 * @returns {JSX.Element} - The rendered header component.
 */
const Header = () => {
  /** Access user authentication context to display user's name if available */
  const { user } = useContext(AuthContext);

  return (
    <Box sx={{ mb: 4 }}>
      <Typography
        variant="h3"
        component="h1"
        sx={{ fontWeight: 'bold', color: 'text.primary' }}
      >
        {user ? `Welcome, ${user.name}` : 'Welcome to Your Dashboard'}
      </Typography>
      <Typography variant="subtitle1" sx={{ mt: 1, color: 'text.secondary' }}>
        Manage your digital life with ease and security.
      </Typography>
    </Box>
  );
};

export default Header;

/**
 * Additional Improvements:
 * - Added user context to personalize the welcome message.
 * - Included comments to clarify the purpose of each element.
 */
