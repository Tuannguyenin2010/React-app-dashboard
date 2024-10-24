// src/components/WeatherWidget.js
import React, { useEffect, useState } from 'react';

const WeatherWidget = () => {
  const [weather, setWeather] = useState(null); // Store weather data
  const [loading, setLoading] = useState(true); // Track loading state

  // Fetch weather data when the component mounts
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=Toronto&units=metric&appid=0ae4e7a78c04910a68d870ea9d913381`
        );
        const data = await response.json();
        setWeather(data); // Store fetched data
      } catch (error) {
        console.error('Error fetching weather data:', error);
      } finally {
        setLoading(false); // Stop loading indicator
      }
    };
    fetchWeather();
  }, []); // Run once on mount

  // Render the weather widget UI
  return (
    <div className="widget">
      <h2>Weather in Toronto</h2>
      {loading ? (
        <p>Loading weather data...</p> // Show loading message
      ) : (
        <div>
          <p>Temperature: {weather.main.temp}°C</p> {/* Display temperature */}
          <p>Weather: {weather.weather[0].description}</p> {/* Display description */}
        </div>
      )}
    </div>
  );
};

export default WeatherWidget; // Export the component

