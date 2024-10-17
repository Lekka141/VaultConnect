import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';

/**
 * Header component responsible for rendering the main dashboard heading and subtitle, along with user-related actions.
 *
 * This component provides an engaging introduction to the dashboard, welcoming the user with a main heading, a supporting subtitle,
 * and user action icons for notifications and profile access. It utilizes Material-UI components for consistent styling and
 * a responsive design that adapts to various screen sizes.
 *
 * @returns {JSX.Element} - The rendered header section with a title, subtitle, and user action icons
 */
function Header() {
  return (
    /**
     * Box component is used for layout and spacing purposes, providing padding, centering the content, and adding an action bar.
     * 'padding' adds spacing around the content, 'textAlign' ensures the content is centered horizontally, and 'display' is used to
     * create a flexible layout that allows for the inclusion of user action icons.
     */
    <Box
      sx={{
        padding: { xs: 2, md: 4 },
        textAlign: 'center',
        backgroundColor: 'primary.main',
        color: 'white',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      {/**
       * Box component for wrapping the main title and subtitle, ensuring they remain grouped and aligned correctly.
       */}
      <Box>
        {/**
         * Typography component for the main heading.
         * 'variant="h4"' sets the size and weight for a heading level 4, and it adapts responsively based on screen size.
         */}
        <Typography variant={{ xs: 'h5', md: 'h4' }} component="h1" gutterBottom>
          Welcome to Your Dashboard
        </Typography>

        {/**
         * Typography component for the subtitle.
         * 'variant="subtitle1"' makes the text suitable for a supporting role, and 'gutterBottom' adds spacing below the element.
         */}
        <Typography variant="subtitle1" component="p">
          Manage your digital footprint with VaultConnect
        </Typography>
      </Box>

      {/**
       * Box component for user-related actions (icons for profile and notifications).
       */}
      <Box>
        <IconButton color="inherit" aria-label="notifications">
          <NotificationsIcon />
        </IconButton>
        <IconButton color="inherit" aria-label="account">
          <AccountCircleIcon />
        </IconButton>
      </Box>
    </Box>
  );
}

export default Header;
