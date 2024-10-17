import React from 'react';
import ReactDOM from 'react-dom/client'; /* Importing the modern ReactDOM method for rendering React components to the DOM */
import './index.css'; /* Importing global styles that will be applied across the application */
import App from './App'; /* Importing the main App component, which serves as the root of the entire application */

/**
 * Create the root container to which the React app will be attached.
 * ReactDOM.createRoot is a newer API that provides improved performance and better concurrency features.
 * It requires an HTML element (in this case, the 'root' div) to serve as the container for the rendered React components.
 */
const root = ReactDOM.createRoot(document.getElementById('root'));

/**
 * Rendering the App component inside the React application.
 * React.StrictMode is a tool for highlighting potential problems in the application.
 * It helps in identifying unsafe lifecycles, legacy API usage, unexpected side effects, and other development warnings.
 * StrictMode does not impact the production build of the app but is very helpful during development.
 */
root.render(
  <React.StrictMode>
    <App /> {/* Render the main App component, which contains all the logic and routing for the application */}
  </React.StrictMode>
);
