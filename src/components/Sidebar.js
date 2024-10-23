// src/components/Sidebar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase-config';
import '../styles.css'; // Ensure styles are imported

const Sidebar = () => {
  const navigate = useNavigate(); // Handle navigation

  // Handle user sign-out
  const handleSignOut = async () => {
    await signOut(auth);
    navigate('/login'); // Redirect to login after sign-out
  };

  return (
    <div className="sidebar">
      <h2>Navigation</h2>
      <ul>
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/weather">Weather</Link></li>
        <li><Link to="/news">News</Link></li>
        <li><Link to="/nasa">NASA</Link></li>
        <li>
          <button onClick={handleSignOut} className="sidebar-signout-button">
            Sign Out
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
