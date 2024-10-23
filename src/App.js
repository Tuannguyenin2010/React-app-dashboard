// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import WeatherPage from './pages/WeatherPage';
import NewsPage from './pages/NewsPage';
import NasaPage from './pages/NasaPage';
import './styles.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <div className="content">
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
