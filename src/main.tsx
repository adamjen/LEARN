import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';

/**
 * Main Entry Point for Tone Navigator Application
 * 
 * This file bootstraps the React application and sets up the root component
 * with React Router for navigation. It's the starting point for the entire
 * ARC, Tone Scale & Emotional Intelligence learning platform.
 */

// Get the root DOM element
const rootElement = document.getElementById('root');

/**
 * Check if root element exists before rendering
 * This prevents errors if the element is missing from index.html
 */
if (!rootElement) {
  throw new Error(
    'Failed to find the root element. Please ensure <div id="root"></div> exists in public/index.html'
  );
}

// Create React root and render the application
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    {/* BrowserRouter provides routing functionality for the app */}
    <BrowserRouter>
      {/* Main application component */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);