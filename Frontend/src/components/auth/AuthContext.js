/**
 * AuthContext.js
 * This file contains the context for managing authentication state across the app.
 * It provides authentication state, user data, login, and logout functionalities.
 */

import React, { createContext, useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';

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
  /**
   * State for tracking if the user is authenticated.
   * @type {boolean} isAuthenticated - Represents whether the user is currently logged in.
   */
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  /**
   * State for storing the logged-in user's information.
   * @type {Object|null} user - Stores information about the authenticated user (e.g., id, name, email).
   */
  const [user, setUser] = useState(null);

  /**
   * State for tracking if authentication state is being initialized or changed.
   * @type {boolean} isLoading - Represents whether the authentication status is being checked or updated.
   */
  const [isLoading, setIsLoading] = useState(true);

  /**
   * useEffect hook to initialize authentication state by checking localStorage for any
   * stored authentication status and user information. This ensures that the user's
   * authentication persists across page reloads.
   */
  useEffect(() => {
    const storedAuthStatus = localStorage.getItem('isAuthenticated');
    const storedUser = localStorage.getItem('user');

    if (storedAuthStatus === 'true') {
      setIsAuthenticated(true);
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false); // Authentication status has been checked
  }, []);

  /**
   * login function to authenticate the user, update authentication state,
   * and persist authentication information in localStorage.
   *
   * @param {string} email - The user's email address.
   * @param {string} password - The user's password.
   * @returns {Promise<void>} - Resolves if login is successful, rejects otherwise.
   */
  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      // Mock API request (replace with real authentication API call)
      if (email === 'user@example.com' && password === 'password123') {
        const userData = {
          id: '123',
          name: 'John Doe',
          email,
        };
        setIsAuthenticated(true);
        setUser(userData);
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('user', JSON.stringify(userData));
        resolve();
      } else {
        reject(new Error('Invalid email or password'));
      }
    });
  };

  /**
   * logout function to clear authentication state, user data, and any stored session
   * information from localStorage, effectively logging the user out.
   */
  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
  };

  return (
    /**
     * AuthContext.Provider allows child components to access authentication-related state and functions.
     * This makes the "isAuthenticated", "user", "isLoading", "login", and "logout" accessible throughout the component tree.
     */
    <AuthContext.Provider value={{ isAuthenticated, user, isLoading, login, logout }}>
      {!isLoading ? children : <div>Loading...</div>}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
