// src/components/NavigationBar.js
import React from 'react';

const NavigationBar = () => (
  <nav style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    gap: '20px', 
    margin: '20px 0' 
  }}>
    <a href="#profile" style={{ textDecoration: 'none' }}>Profile</a>
    <a href="#users" style={{ textDecoration: 'none' }}>Users</a>
    <a href="#weather" style={{ textDecoration: 'none' }}>Weather</a>
    <a href="#news" style={{ textDecoration: 'none' }}>News</a>
    <a href="#nasa" style={{ textDecoration: 'none' }}>NASA</a>
  </nav>
);

export default NavigationBar;
