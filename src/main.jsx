/**
 * main.jsx - React entry point
 * 
 * Initializes the React app:
 * 1. Imports the main App component
 * 2. Imports global CSS styles
 * 3. Mounts the App to the #root DOM element
 */

import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles.css';

// Get the root container from index.html
const container = document.getElementById('root');
// Create a React root and render the App
const root = createRoot(container);
root.render(<App />);
