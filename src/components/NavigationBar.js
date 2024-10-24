// src/components/NavigationBar.js
import React from 'react';

const NavigationBar = () => (
  // Render a navigation bar with centered links
  <nav
    style={{
      display: 'flex', // Use flexbox for layout
      justifyContent: 'center', // Center the links horizontally
      gap: '20px', // Space between links
      margin: '20px 0' // Vertical margin
    }}
  >
    {/* Navigation links to different sections */}
    <a href="#profile" style={{ textDecoration: 'none' }}>Profile</a>
    <a href="#users" style={{ textDecoration: 'none' }}>Users</a>
    <a href="#weather" style={{ textDecoration: 'none' }}>Weather</a>
    <a href="#news" style={{ textDecoration: 'none' }}>News</a>
    <a href="#nasa" style={{ textDecoration: 'none' }}>NASA</a>
  </nav>
);

export default NavigationBar; // Export the component
