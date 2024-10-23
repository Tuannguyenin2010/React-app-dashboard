// src/components/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles.css'; // Ensure CSS is imported

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Navigation</h2>
      <ul>
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/weather">Weather</Link></li>
        <li><Link to="/news">News</Link></li>
        <li><Link to="/nasa">NASA</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
