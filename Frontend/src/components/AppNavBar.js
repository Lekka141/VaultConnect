import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

/**
 * AppNavbar component renders the top navigation bar with branding and menu icon
 *
 * This component provides a consistent header for the application with a title and an optional menu icon.
 * It uses Material-UI components to create a responsive AppBar, making it look modern and consistent
 * with the overall Material Design language.
 *
 * @returns {JSX.Element} - The rendered navigation bar
 */
function AppNavbar() {
  return (
    /**
     * AppBar component serves as a container for the navigation elements.
     * 'position="static"' keeps the AppBar positioned at the top but does not scroll with the content.
     */
    <AppBar position="static">
      {/* Toolbar provides consistent spacing for the content inside the AppBar. */}
      <Toolbar>
        {/*
         * IconButton renders a button with an icon (in this case, a menu icon).
         * It is typically used for triggering a drawer (side menu) on smaller screens.
         *
         * 'edge="start"' aligns the button at the start of the toolbar,
         * 'color="inherit"' ensures the button matches the AppBar's color scheme.
         */}
        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>

        {/*
         * Typography component renders the text for the application title.
         * 'variant="h6"' sets the text style to be suitable for a heading of level 6,
         * 'component="div"' indicates the HTML element to be rendered, in this case, a div.
         */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          VaultConnect Dashboard
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default AppNavbar;
