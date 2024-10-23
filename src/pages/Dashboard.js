// src/pages/Dashboard.js
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase-config';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore'; // Firestore functions
import '../styles.css'; // Import the CSS file

const Dashboard = () => {
  const [user] = useAuthState(auth); // Current authenticated user
  const [userName, setUserName] = useState(''); // State to store user's name
  const [users, setUsers] = useState([]); // State to store all registered users
  const navigate = useNavigate(); // For page navigation

  // Redirect to login if the user is not authenticated
  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  // Fetch the current user's name from Firestore
  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          setUserName(data.name); // Store the user's name in state
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (user) {
      fetchUserName(); // Fetch the user’s name on component mount
    }
  }, [user]);

  // Fetch all registered users from Firestore
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersCollection = collection(db, 'users');
        const userDocs = await getDocs(usersCollection); // Retrieve all user documents
        const userList = userDocs.docs.map((doc) => doc.data()); // Map documents to user objects
        setUsers(userList); // Store user data in state
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers(); // Fetch the users on component mount
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>

      {/* User Profile Widget */}
      <div className="widget">
        <h2>User Profile</h2>
        {user ? (
          <div>
            <p><strong>Name:</strong> {userName}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>User ID:</strong> {user.uid}</p>
          </div>
        ) : (
          <p>Loading user data...</p>
        )}
      </div>

      {/* User List Widget */}
      <div className="widget">
        <h2>Registered Users</h2>
        {users.length > 0 ? (
          <ul>
            {users.map((u, index) => (
              <li key={index}>
                <strong>Name:</strong> {u.name} <br />
                <strong>Email:</strong> {u.email}
              </li>
            ))}
          </ul>
        ) : (
          <p>No users registered yet.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
