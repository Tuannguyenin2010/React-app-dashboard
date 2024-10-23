// src/pages/Dashboard.js
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase-config';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import '../styles.css';

const Dashboard = () => {
  const [user] = useAuthState(auth);
  const [userName, setUserName] = useState('');
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

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

      <div className="widget">
        <h2>Registered Users</h2>
        <ul>
          {users.map((u, index) => (
            <li key={index}>
              <strong>Name:</strong> {u.name} <br />
              <strong>Email:</strong> {u.email}
            </li>
          ))}
        </ul>
      </div>

      <WeatherWidget />
      <NewsWidget />
      <NasaWidget />
    </div>
  );
};

const WeatherWidget = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=Toronto&units=metric&appid=0ae4e7a78c04910a68d870ea9d913381`
        );
        const data = await response.json();
        setWeather(data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchWeather();
  }, []);

  return (
    <div className="widget">
      <h2>Weather in Toronto</h2>
      {loading ? (
        <p>Loading weather data...</p>
      ) : (
        <div>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Weather: {weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

const NewsWidget = () => {
  const [news, setNews] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          `https://newsapi.org/v2/top-headlines?country=us&apiKey=b200896064914ff58f3171e8c290571c`
        );
        if (!response.ok) throw new Error('Failed to fetch news.');
        const data = await response.json();
        setNews(data.articles);
      } catch (error) {
        console.error('Error fetching news:', error);
        setError('Unable to fetch news.');
      }
    };
    fetchNews();
  }, []);

  return (
    <div className="widget">
      <h2>Top News</h2>
      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <ul>
          {news.slice(0, 5).map((article, index) => (
            <li key={index}>
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                {article.title}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const NasaWidget = () => {
    const [apod, setApod] = useState(null); // Store APOD data
    const [error, setError] = useState(''); // Store fetch errors
  
    useEffect(() => {
      const fetchApod = async () => {
        try {
          const response = await fetch(
            `https://api.nasa.gov/planetary/apod?api_key=0aT1mzRNXlmedoOPgFfORKOJpKCFbdaQXDVyoe8p`
          );
          if (!response.ok) throw new Error('Failed to fetch APOD.');
          const data = await response.json();
          setApod(data); // Store the APOD data in state
        } catch (error) {
          console.error('Error fetching APOD:', error);
          setError('Unable to fetch APOD. Please try again later.');
        }
      };
  
      fetchApod(); // Fetch APOD on component mount
    }, []);
  
    const renderMedia = () => {
      if (apod.media_type === 'image') {
        // Display the image
        return <img src={apod.url} alt={apod.title} style={{ maxWidth: '100%' }} />;
      } else if (apod.media_type === 'video') {
        if (apod.url.includes('youtube.com') || apod.url.includes('youtu.be')) {
          // Embed YouTube video
          return (
            <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
              <iframe
                src={apod.url}
                title={apod.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
              ></iframe>
            </div>
          );
        } else {
          // Provide a fallback link for non-embeddable videos
          return (
            <p>
              This media is not embeddable. You can view it <a href={apod.url} target="_blank" rel="noopener noreferrer">here</a>.
            </p>
          );
        }
      } else {
        // Fallback for unsupported media types
        return <p>Media type not supported. Please visit the <a href={apod.url} target="_blank" rel="noopener noreferrer">link</a>.</p>;
      }
    };
  
    return (
      <div className="widget">
        <h2>Astronomy Picture of the Day</h2>
        {error ? (
          <p style={{ color: 'red' }}>{error}</p>
        ) : apod ? (
          <div>
            <h3>{apod.title}</h3>
            {renderMedia()}
            <p>{apod.explanation}</p>
          </div>
        ) : (
          <p>Loading APOD...</p>
        )}
      </div>
    );
  };
  
  

export default Dashboard;
