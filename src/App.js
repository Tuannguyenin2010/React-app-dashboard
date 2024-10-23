// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase-config';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import WeatherPage from './pages/WeatherPage';
import NewsPage from './pages/NewsPage';
import NasaPage from './pages/NasaPage';
import './styles.css';

function App() {
  const [user] = useAuthState(auth); // Track authenticated user

  return (
    <Router>
      <div className="app-container">
        {/* Render Sidebar only if the user is logged in */}
        {user && <Sidebar />}
        <div className={`content ${user ? '' : 'full-width'}`}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/weather" element={<WeatherPage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/nasa" element={<NasaPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
