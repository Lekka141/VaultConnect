import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // To handle navigation in React

/** Create an Axios instance with a base URL and a timeout */
const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000', // Ensure REACT_APP_API_URL is set
  timeout: 20000, /** 20 seconds timeout for all requests */
});

/**
 * Add request interceptor to include authorization token.
 * This ensures that all outgoing requests contain the user's auth token if available.
 */
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken'); // Make sure token is correctly stored in localStorage
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; /** Include Bearer token in request headers */
    }
    return config;
  },
  (error) => {
    console.error('Request error:', error); /** Log request errors for debugging */
    return Promise.reject(error); /** Handle any errors occurring before the request is sent */
  }
);

/**
 * Add response interceptor to handle global error responses.
 * Redirects to sign-in page if the response indicates unauthorized access (401).
 *
 * Response interceptors are useful for:
 * - Handling common HTTP errors globally (e.g., 401 Unauthorized, 500 Server Error).
 * - Logging errors or providing custom error messages.
 */
API.interceptors.response.use(
  (response) => response,
  (error) => {
    const navigate = useNavigate(); // Add navigate function for routing

    if (error.response) {
      switch (error.response.status) {
        case 401:
          console.warn('Authentication expired. Redirecting to sign-in.'); /** Warn user about expired session */
          localStorage.removeItem('authToken'); /** Remove token to clear session */
          navigate('/signin'); /** Use navigate for React Router-based navigation */
          break;
        case 403:
          console.error('Access denied. You do not have permission to access this resource.');
          break;
        case 404:
          console.error('Resource not found (404).');
          break;
        case 500:
          console.error('Internal server error. Please try again later.');
          break;
        default:
          console.error(`Unexpected error: ${error.response.status}`);
      }
    } else {
      console.error('Network error or server is unreachable:', error); /** Handle network errors */
    }
    return Promise.reject(error); /** Reject the promise with the error to handle it in calling functions */
  }
);

/**
 * Function for logging in a user.
 * Makes a POST request with email and password to authenticate the user.
 * Stores the received auth token in localStorage.
 *
 * @param {string} email - User's email address.
 * @param {string} password - User's password.
 * @returns {object} - Response data from the API.
 * @throws {Error} - Throws an error if the login request fails.
 */
export const login = async (email, password) => {
  try {
    const response = await API.post('/signin', { email, password });
    if (response.data.token) {
      localStorage.setItem('authToken', response.data.token); /** Save token for future requests */
    }
    return response.data;
  } catch (error) {
    console.error('Login failed:', error.message || error);
    throw error; /** Throw the error for the caller to handle */
  }
};

/**
 * Function for making GET requests.
 *
 * @param {string} endpoint - The API endpoint to send the request to.
 * @param {object} [params={}] - Optional query parameters for the request.
 * @returns {object} - Response data from the API.
 * @throws {Error} - Throws an error if the GET request fails.
 */
export const get = async (endpoint, params = {}) => {
  try {
    const response = await API.get(endpoint, { params });
    return response.data;
  } catch (error) {
    console.error(`GET request to ${endpoint} failed:`, error.message || error);
    throw error; /** Throw the error for the caller to handle */
  }
};

/**
 * Function for making POST requests.
 *
 * @param {string} endpoint - The API endpoint to send the request to.
 * @param {object} data - The data to send in the request body.
 * @returns {object} - Response data from the API.
 * @throws {Error} - Throws an error if the POST request fails.
 */
export const post = async (endpoint, data) => {
  try {
    const response = await API.post(endpoint, data);
    return response.data;
  } catch (error) {
    console.error(`POST request to ${endpoint} failed:`, error.message || error);
    throw error; /** Throw the error for the caller to handle */
  }
};

/**
 * Function to fetch specific data for the dashboard.
 * Uses the generic get function to retrieve data from the '/dashboard-data' endpoint.
 *
 * @returns {object} - Dashboard data from the API.
 * @throws {Error} - Throws an error if the GET request fails.
 */
export const getData = async () => {
  return await get('/dashboard-data');
};

export default API;
