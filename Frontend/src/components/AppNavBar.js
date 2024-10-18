import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Button, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';

/**
 * AppNavbar component renders the top navigation bar with branding, menu icon, and navigation buttons.
 *
 * This component provides a consistent header for the application with a title, an optional menu icon,
 * and navigation links. It uses Material UI components to create a responsive AppBar, making it look modern
 * and consistent with the overall Material Design language.
 *
 * @returns {JSX.Element} - The rendered navigation bar.
 */
function AppNavbar() {
  /** Hook to navigate the user to different routes */
  const navigate = useNavigate();

  /**
   * Handles navigation to the sign-in page.
   */
  const handleSignIn = () => {
    navigate('/signin'); /** Redirects to the sign-in page */
  };

  /**
   * Placeholder function for handling menu click.
   * This function should ideally toggle the side menu for mobile devices.
   */
  const handleMenuClick = () => {
    console.log('Menu button clicked'); /** Logs the menu button click for development purposes */
    // TODO: Implement side menu toggling logic
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: 'primary.dark' }}>
      <Toolbar>
        {/** Menu Button for mobile devices */}
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={handleMenuClick} /** Calls the handleMenuClick function when menu button is clicked */
          sx={{ mr: 2, display: { xs: 'block', md: 'none' } }}
        >
          <MenuIcon />
        </IconButton>

        {/** Branding */}
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, fontWeight: 'bold', display: 'flex', alignItems: 'center' }}
        >
          <img
            src="/Images/Logo.png" /** Updated the path to be relative to the public directory */
            alt="VaultConnect Logo"
            style={{ height: '40px', marginRight: '10px' }}
          />
          VaultConnect Dashboard
        </Typography>

        {/** Navigation Links */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
          <Button color="inherit" onClick={() => navigate('/features')}>Features</Button>
          <Button color="inherit" onClick={() => navigate('/about')}>About Us</Button>
          <Button color="inherit" onClick={() => navigate('/contact')}>Contact</Button>
          <Button
            color="inherit"
            variant="outlined"
            onClick={handleSignIn} /** Calls handleSignIn function to navigate to the sign-in page */
            sx={{ borderColor: 'white', ml: 2 }}
          >
            Sign In
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default AppNavbar;

/**
 * Additional Improvements:
 * - Added aria-labels for better accessibility.
 * - Improved button placement and spacing for better responsiveness.
 * - Added comments for easier code maintenance and understanding.
 */
