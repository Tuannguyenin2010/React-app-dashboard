// src/pages/Dashboard.js
import React, { useEffect } from 'react'; 
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase-config';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  // Fetch the current authenticated user
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  // Redirect to login if the user is not authenticated
  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <div>
      <h1>Dashboard</h1>
      {/* User Profile Widget */}
      <div className="widget">
        <h2>User Profile</h2>
        {user ? (
          <div>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>User ID:</strong> {user.uid}</p>
          </div>
        ) : (
          <p>Loading user data...</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
