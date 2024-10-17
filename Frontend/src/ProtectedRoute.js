import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './components/auth/AuthContext';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

/**
 * ProtectedRoute component ensures that only authenticated users can access certain routes.
 * If the user is not authenticated, they will be redirected to the sign-in page.
 *
 * @param {object} props - The properties passed to the component.
 * @param {React.Component} props.children - The component to render if the user is authenticated.
 * @returns {React.Component} - The component that either renders the protected content or redirects to the sign-in page.
 */
const ProtectedRoute = ({ children }) => {
  /** Access the authentication status from the AuthContext. */
  const { isAuthenticated, isLoading } = useContext(AuthContext);

  /**
   * Display a loading spinner while authentication status is being determined.
   */
  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        <CircularProgress aria-label="Loading authentication status" />
      </Box>
    );
  }

  /**
   * If the user is authenticated, render the protected content (children).
   * Otherwise, redirect the user to the sign-in page.
   */
  return isAuthenticated ? children : <Navigate to="/signin" replace />;
};

export default ProtectedRoute;
