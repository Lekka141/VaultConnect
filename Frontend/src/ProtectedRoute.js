import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './components/auth/AuthContext';

/**
 * ProtectedRoute component ensures that only authenticated users can access certain routes.
 * If the user is not authenticated, they will be redirected to the sign-in page.
 *
 * @param {object} props - The properties passed to the component.
 * @param {React.Component} props.children - The component to render if the user is authenticated.
 * @returns {React.Component} - The component that either renders the protected content or redirects to the sign-in page.
 */
const ProtectedRoute = ({ children }) => {
  /**
   * Access the authentication status from the AuthContext.
   * isAuthenticated will be true if the user is logged in, otherwise false.
   */
  const { isAuthenticated } = useContext(AuthContext);

  /**
   * If the user is authenticated, render the children components (protected content).
   * Otherwise, redirect the user to the sign-in page.
   */
  return isAuthenticated ? children : <Navigate to="/signin" replace />;
};

export default ProtectedRoute;

