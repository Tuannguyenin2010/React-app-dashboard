// src/pages/Dashboard.js
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase-config';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import WeatherWidget from '../components/WeatherWidget';
import NewsWidget from '../components/NewsWidget';
import NasaWidget from '../components/NasaWidget';
import ChecklistWidget from '../components/ChecklistWidget';
import CalculatorWidget from '../components/CalculatorWidget';

const Dashboard = () => {
  const [user] = useAuthState(auth); // Track the authenticated user
  const [userName, setUserName] = useState(''); // Store user's name
  const [users, setUsers] = useState([]); // Store registered users
  const navigate = useNavigate(); // Handle page navigation

  // Redirect to login page if the user is not authenticated
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  // Fetch the current user's name from Firestore
  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          setUserName(userDoc.data().name);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    if (user) fetchUserName();
  }, [user]);

  // Fetch all registered users from Firestore
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersCollection = collection(db, 'users');
        const userDocs = await getDocs(usersCollection);
        setUsers(userDocs.docs.map((doc) => doc.data()));
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  // Handle user sign-out
  const handleSignOut = async () => {
    await signOut(auth);
    navigate('/login'); // Redirect to login after sign-out
  };

  return (
    <div>
      <h1>Welcome to the Dashboard</h1>
      {user && (
        <button onClick={handleSignOut} className="sign-out-button">
          Sign Out
        </button>
      )}

      {/* User Profile Section */}
      <section className="widget">
        <h2>User Profile</h2>
        {user ? (
          <div>
            <p><strong>Name:</strong> {userName}</p>
            <p><strong>Email:</strong> {user.email}</p>
          </div>
        ) : (
          <p>Loading user data...</p>
        )}
      </section>

      {/* Registered Users Section */}
      <section className="widget">
        <h2>Registered Users</h2>
        <ul>
          {users.map((u, index) => (
            <li key={index}>
              <strong>Name:</strong> {u.name} <br />
              <strong>Email:</strong> {u.email}
            </li>
          ))}
        </ul>
      </section>

      {/* Weather Widget Section */}
      <section className="widget">
        <WeatherWidget />
      </section>

      {/* News Widget Section */}
      <section className="widget">
        <NewsWidget />
      </section>

      {/* NASA Widget Section */}
      <section className="widget">
        <NasaWidget />
      </section>

      {/* Checklist Widget Section */}
      <section className="widget">
        <ChecklistWidget />
      </section>

      {/* Calculator Widget Section */}
      <section className="widget">
        <CalculatorWidget />
      </section>
    </div>
  );
};

export default Dashboard;
