// src/pages/Dashboard.js
import React, { useEffect } from 'react'; 
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase-config';
import { useNavigate } from 'react-router-dom';
import '../styles.css';
import { collection, getDocs } from 'firebase/firestore'; // Import Firestore functions


const Dashboard = () => {
  // Fetch the current authenticated user
  const [user] = useAuthState(auth);
  const [users, setUsers] = useState([]); // Store list of registered users
  const navigate = useNavigate();

  // Redirect to login if the user is not authenticated
  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

   // Fetch users from Firestore collection
   useEffect(() => {
    const fetchUsers = async () => {
      const usersCollection = collection(db, 'users');
      const userDocs = await getDocs(usersCollection);
      const userList = userDocs.docs.map(doc => doc.data());
      setUsers(userList); // Store user data in state
    };
    fetchUsers();
  }, []);

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

      {/* User List Widget */}
      <div className="widget">
        <h2>Registered Users</h2>
        {users.length > 0 ? (
          <ul>
            {users.map((u, index) => (
              <li key={index}>{u.email}</li> // Display each user's email
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