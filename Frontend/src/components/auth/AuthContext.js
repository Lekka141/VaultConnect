import React, { createContext, useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import API from '../../utils/API'; /** Assuming an API utility for backend interaction */

/** Create the AuthContext to be used globally in the application */
export const AuthContext = createContext();

/** Custom hook to use the AuthContext more easily */
export const useAuth = () => useContext(AuthContext);

/**
 * AuthProvider component manages authentication state, providing the necessary context
 * for all child components to access and update authentication status.
 *
 * @param {ReactNode} children - The components that require access to the authentication state.
 */
export const AuthProvider = ({ children }) => {
  /** State for tracking if the user is authenticated. */
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  /** State for storing the logged-in user's information. */
  const [user, setUser] = useState(null);

  /** State for tracking if authentication state is being initialized or changed. */
  const [isLoading, setIsLoading] = useState(true);

  /**
   * useEffect hook to initialize authentication state by checking sessionStorage for any
   * stored authentication status and user information. This ensures that the user's
   * authentication persists across page reloads while not exposing data in localStorage.
   */
  useEffect(() => {
    const storedAuthStatus = sessionStorage.getItem('isAuthenticated');
    const storedUser = sessionStorage.getItem('user');

    if (storedAuthStatus === 'true' && storedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false); /** Authentication status has been checked */
  }, []);

  /**
   * login function to authenticate the user, update authentication state,
   * and persist authentication information in sessionStorage.
   *
   * @param {string} email - The user's email address.
   * @param {string} password - The user's password.
   * @returns {Promise<void>} - Resolves if login is successful, rejects otherwise.
   */
  const login = async (email, password) => {
    try {
      /** Make an API request to authenticate the user */
      const response = await API.post('/login', { email, password });

      if (response.data.token) {
        /** Assume response includes user data and a token */
        const userData = response.data.user;

        setIsAuthenticated(true);
        setUser(userData);
        sessionStorage.setItem('isAuthenticated', 'true');
        sessionStorage.setItem('user', JSON.stringify(userData));
        sessionStorage.setItem('authToken', response.data.token);
      } else {
        throw new Error('Authentication failed.');
      }
    } catch (error) {
      console.error('Login error:', error.message || error);
      throw error; /** Rethrow the error for the caller to handle */
    }
  };

  /**
   * logout function to clear authentication state, user data, and any stored session
   * information from sessionStorage, effectively logging the user out.
   */
  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    sessionStorage.removeItem('isAuthenticated');
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('authToken');
  };

  return (
    /**
     * AuthContext.Provider allows child components to access authentication-related state and functions.
     * This makes the "isAuthenticated", "user", "isLoading", "login", and "logout" accessible throughout the component tree.
     */
    <AuthContext.Provider value={{ isAuthenticated, user, isLoading, login, logout }}>
      {!isLoading ? (
        children
      ) : (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
          }}
        >
          <CircularProgress aria-label="Loading authentication status" /> /** Improved loading state UX with a spinner */
        </Box>
      )}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
