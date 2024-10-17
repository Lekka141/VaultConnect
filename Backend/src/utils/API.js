import axios from 'axios';

// Base URL for API requests, switching between development and production
const API = axios.create({
  baseURL: process.env.NODE_ENV === 'production' 
    ? 'https://api.yourbackend.com' 
    : 'http://localhost:5000', // Adjust this based on your backend server URL
});

// Public API requests (Signup, Signin)
export const signUp = (name, email, password) => API.post('/api/users/signup', { name, email, password });
export const signIn = (email, password) => API.post('/api/users/signin', { email, password });

// Authenticated API requests (protected routes)
export const getProtectedResource = (token) => {
  return API.get('/api/protected/resource', {
    headers: {
      Authorization: `Bearer ${token}`, // Attach token to Authorization header
    },
  });
};

// Optional: You can add a utility function to set the Authorization token in axios headers globally
export const setAuthToken = (token) => {
  if (token) {
    // Apply to every request if logged in
    API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    // Delete auth header
    delete API.defaults.headers.common['Authorization'];
  }
};

export default API;
