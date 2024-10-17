import axios from 'axios';

/** Create an Axios instance with a base URL and a timeout */
const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000',
  timeout: 20000, /** 20 seconds timeout for all requests */
});

/**
 * Add request interceptor to include authorization token.
 * This ensures that all outgoing requests contain the user's auth token if available.
 *
 * Request interceptors are commonly used for:
 * - Adding authentication headers to requests.
 * - Modifying request configurations before they are sent.
 */
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
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
 * Redirects to login page if the response indicates unauthorized access (401).
 *
 * Response interceptors are useful for:
 * - Handling common HTTP errors globally (e.g., 401 Unauthorized, 500 Server Error).
 * - Logging errors or providing custom error messages.
 */
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          window.location.href = '/login'; /** Redirect to login if unauthorized */
          break;
        case 403:
          console.error('Access denied. You do not have permission to access this resource.');
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
    const response = await API.post('/login', { email, password });
    if (response.data.token) {
      localStorage.setItem('authToken', response.data.token); /** Save token for future requests */
    }
    return response.data;
  } catch (error) {
    console.error('Login failed:', error);
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
    console.error(`GET request to ${endpoint} failed:`, error);
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
    console.error(`POST request to ${endpoint} failed:`, error);
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
