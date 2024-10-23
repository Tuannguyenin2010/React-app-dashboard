// src/pages/Register.js
import React, { useState } from 'react'; 
import { createUserWithEmailAndPassword } from 'firebase/auth'; 
import { auth } from '../firebase-config'; 
import { useNavigate } from 'react-router-dom';

const Register = () => {
  // State to store user inputs (email and password) and error message
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // useNavigate hook helps with route navigation
  const navigate = useNavigate();

  // Function to handle registration form submission
  const handleRegister = async (e) => {
    e.preventDefault(); // Prevent page reload on submission
    try {
      // Create a new user with Firebase Authentication
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/dashboard'); // Redirect to dashboard on success
    } catch (error) {
      // Display an error if registration fails
      setError('Failed to register. Try again.');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      {/* Display error message if present */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleRegister}>
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
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
