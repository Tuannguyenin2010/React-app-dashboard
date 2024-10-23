// src/pages/Dashboard.js
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase-config';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import WeatherWidget from '../components/WeatherWidget';
import NewsWidget from '../components/NewsWidget';
import NasaWidget from '../components/NasaWidget';
import ChecklistWidget from '../components/ChecklistWidget';
import CalculatorWidget from '../components/CalculatorWidget';

const Dashboard = () => {
  const [user] = useAuthState(auth);
  const [userName, setUserName] = useState('');
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

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
      <h1>Welcome to the Dashboard</h1>

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

      <section className="widget">
        <WeatherWidget />
      </section>

      <section className="widget">
        <NewsWidget />
      </section>

      <section className="widget">
        <NasaWidget />
      </section>

      <section className="widget">
        <ChecklistWidget />
      </section>

      <section className="widget">
        <CalculatorWidget />
      </section>
    </div>
  );
};

export default Dashboard;
