// src/pages/WeatherPage.js
import React, { useEffect, useState } from 'react';

const WeatherPage = () => {
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
        console.error('Error fetching detailed weather:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchWeather();
  }, []);

  return (
    <div className="widget">
      <h2>Detailed Weather Information</h2>
      {loading ? (
        <p>Loading weather data...</p>
      ) : weather ? (
        <div>
          <p><strong>City:</strong> {weather.name}</p>
          <p><strong>Temperature:</strong> {weather.main.temp}°C</p>
          <p><strong>Weather:</strong> {weather.weather[0].description}</p>
          <p><strong>Humidity:</strong> {weather.main.humidity}%</p>
        </div>
      ) : (
        <p>No weather data available.</p>
      )}
    </div>
  );
};

export default WeatherPage;
