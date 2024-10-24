// src/pages/LoginPage.js
import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase-config';
import { useNavigate, Link } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState(''); // Store user email input
  const [password, setPassword] = useState(''); // Store user password input
  const [error, setError] = useState(''); // Store login error messages
  const navigate = useNavigate(); // Navigate programmatically

  // Handle user login when the form is submitted
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent page reload
    try {
      await signInWithEmailAndPassword(auth, email, password); // Authenticate with Firebase
      navigate('/'); // Redirect to Dashboard on success
    } catch (error) {
      setError('Incorrect email or password. Please try again.'); // Set error message
    }
  };

  // Render the login form UI
  return (
    <div className="widget">
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error if any */}
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} // Update email state
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} // Update password state
          required
        />
        <button type="submit">Login</button> {/* Submit form */}
      </form>
      <p>
        Don't have an account? <Link to="/register">Register here</Link> {/* Link to registration */}
      </p>
    </div>
  );
};

export default LoginPage; // Export the component
