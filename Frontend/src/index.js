import React from 'react';
import ReactDOM from 'react-dom/client'; // Importing the modern ReactDOM for rendering components
import './index.css'; // Global styles for the entire application
import App from './App'; // The root component of the entire application

// Create the root container for the React application
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component within the root element
// React.StrictMode helps detect potential issues during development
root.render(
  <React.StrictMode>
    <App /> {/* The main App component containing all routing and application logic */}
  </React.StrictMode>
);
