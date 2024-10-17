import React from 'react';
import PropTypes from 'prop-types';
import { AppBar, Toolbar, IconButton, Typography, Container, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

/**
 * TemplateFrame component is a wrapper layout for pages, including a navigation bar.
 */
const TemplateFrame = ({ children }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            VaultConnect
          </Typography>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 3 }}>
        {/* Rendering child components */}
        {children}
      </Container>
    </Box>
  );
};

TemplateFrame.propTypes = {
  /** Children elements to be rendered inside the template */
  children: PropTypes.node.isRequired,
};

export default TemplateFrame;
