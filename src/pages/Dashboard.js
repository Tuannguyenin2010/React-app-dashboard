// src/pages/Dashboard.js
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase-config';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import '../styles.css';
import NavigationBar from '../components/NavigationBar'; // Import NavigationBar
import WeatherWidget from '../components/WeatherWidget'; // Import WeatherWidget
import NewsWidget from '../components/NewsWidget'; // Import NewsWidget
import NasaWidget from '../components/NasaWidget'; // Import NasaWidget
import ChecklistWidget from '../components/ChecklistWidget'; // Import ChecklistWidget
import CalculatorWidget from '../components/CalculatorWidget'; // Import CalculatorWidget

const Dashboard = () => {
  const [user] = useAuthState(auth); // Track logged-in user
  const [userName, setUserName] = useState(''); // Store user's name
  const [users, setUsers] = useState([]); // Store all registered users
  const navigate = useNavigate(); // Navigate between pages

  // Redirect to login if the user is not authenticated
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

  return (
    <div>
      <h1>Dashboard</h1>
      <NavigationBar />

      {/* User Profile Section */}
      <section id="profile" className="widget">
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
      </section>

      {/* Registered Users Section */}
      <section id="users" className="widget">
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
      <section id="weather" className="widget">
        <WeatherWidget />
      </section>

      {/* News Widget Section */}
      <section id="news" className="widget">
        <NewsWidget />
      </section>

      {/* NASA Widget Section */}
      <section id="nasa" className="widget">
        <NasaWidget />
      </section>

      {/* Checklist Widget Section */}
      <section id="checklist" className="widget">
        <ChecklistWidget />
      </section>

      {/* Calculator Widget Section */}
      <section id="calculator" className="widget">
        <CalculatorWidget />
      </section>
    </div>
  );
};

export default Dashboard;
