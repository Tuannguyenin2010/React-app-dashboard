// src/App.js
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import LoginPage from './pages/LoginPage'; 
import RegisterPage from './pages/RegisterPage'; 
import WeatherPage from './pages/WeatherPage';
import NewsPage from './pages/NewsPage';
import NasaPage from './pages/NasaPage';

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Dashboard</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="/weather">Weather</Link>
        <Link to="/news">News</Link>
        <Link to="/nasa">NASA</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/weather" element={<WeatherPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/nasa" element={<NasaPage />} />
      </Routes>
    </Router>
  );
}

export default App;
