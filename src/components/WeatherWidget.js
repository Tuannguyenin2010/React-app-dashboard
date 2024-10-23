// src/components/WeatherWidget.js
import React, { useEffect, useState } from 'react';

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

export default WeatherWidget;
