// src/pages/RegisterPage.js
import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase-config';
import { setDoc, doc } from 'firebase/firestore';
import { useNavigate, Link } from 'react-router-dom';

const RegisterPage = () => {
  const [name, setName] = useState(''); // Store user's name input
  const [email, setEmail] = useState(''); // Store user's email input
  const [password, setPassword] = useState(''); // Store user's password input
  const [error, setError] = useState(''); // Store error messages
  const navigate = useNavigate(); // Navigate programmatically

  // Handle user registration
  const handleRegister = async (e) => {
    e.preventDefault(); // Prevent page reload
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password); // Create new user
      const user = userCredential.user;

      // Save user details to Firestore
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        name,
        email: user.email,
        createdAt: new Date(), // Store account creation date
      });

      navigate('/'); // Redirect to Dashboard on success
    } catch (error) {
      setError('Registration failed. Please try again.'); // Display error message
    }
  };

  // Render the registration form UI
  return (
    <div className="widget">
      <h2>Register</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error if any */}
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)} // Update name state
          required
        />
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
        <button type="submit">Register</button> {/* Submit form */}
      </form>
      <p>
        Already have an account? <Link to="/login">Login here</Link> {/* Link to login page */}
      </p>
    </div>
  );
};

export default RegisterPage; // Export the component
