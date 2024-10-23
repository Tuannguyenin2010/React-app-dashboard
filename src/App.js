// src/App.js
import React from 'react'; 
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';

const App = () => (
  <Router>
    {/* Navigation links to switch between Login, Register, and Dashboard */}
    <nav>
      <Link to="/">Login</Link>
      <Link to="/register">Register</Link>
    </nav>

    {/* Define the routes for each page */}
    <Routes>
      {/* Route for the Login page */}
      <Route path="/" element={<Login />} />

      {/* Route for the Register page */}
      <Route path="/register" element={<Register />} />

      {/* Placeholder route for the Dashboard */}
      <Route path="/dashboard" element={<h1>Dashboard</h1>} />
    </Routes>
  </Router>
);

export default App;
