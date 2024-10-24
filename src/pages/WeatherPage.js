// src/pages/WeatherPage.js
import React, { useEffect, useState } from 'react';

const WeatherPage = () => {
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
        setWeather(data); // Store the fetched data
      } catch (error) {
        console.error('Error fetching detailed weather:', error); // Log errors
      } finally {
        setLoading(false); // Stop loading indicator
      }
    };
    fetchWeather();
  }, []); // Run once on mount

  // Render the weather details or relevant messages
  return (
    <div className="widget">
      <h2>Detailed Weather Information</h2>
      {loading ? (
        <p>Loading weather data...</p> // Show loading message
      ) : weather ? (
        <div>
          <p><strong>City:</strong> {weather.name}</p> {/* Display city name */}
          <p><strong>Temperature:</strong> {weather.main.temp}°C</p> {/* Display temperature */}
          <p><strong>Weather:</strong> {weather.weather[0].description}</p> {/* Display weather description */}
          <p><strong>Humidity:</strong> {weather.main.humidity}%</p> {/* Display humidity */}
        </div>
      ) : (
        <p>No weather data available.</p> // Handle missing data
      )}
    </div>
  );
};

export default WeatherPage; // Export the component
