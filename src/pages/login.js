// src/pages/Login.js
import React, { useState } from 'react'; 
import { signInWithEmailAndPassword } from 'firebase/auth'; 
import { auth } from '../firebase-config'; 
import { useNavigate } from 'react-router-dom';

const Login = () => {
  // State to store user inputs (email and password) and error message
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // useNavigate hook helps with navigation between routes
  const navigate = useNavigate();

  // Function to handle login when the form is submitted
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent page reload on form submission
    try {
      // Attempt to log in with Firebase Authentication
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard'); // Navigate to the dashboard on success
    } catch (error) {
      // Display error message if login fails
      setError('Incorrect email or password.');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {/* Display error message if present */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)} // Update email state
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)} // Update password state
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
