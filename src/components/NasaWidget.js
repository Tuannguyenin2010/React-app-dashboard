// src/components/NasaWidget.js
import React, { useEffect, useState } from 'react';

const NasaWidget = () => {
  const [apod, setApod] = useState(null); // Store APOD data
  const [error, setError] = useState(''); // Store any fetch errors

  // Fetch APOD data when the component mounts
  useEffect(() => {
    const fetchApod = async () => {
      try {
        const apiKey = '0aT1mzRNXlmedoOPgFfORKOJpKCFbdaQXDVyoe8p';
        const response = await fetch(
          `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch APOD. Status: ${response.status}`);
        }
        const data = await response.json();
        setApod(data); // Store the fetched data
      } catch (error) {
        console.error('Error fetching APOD:', error);
        setError('Unable to fetch APOD. Please try again later.');
      }
    };
    fetchApod();
  }, []); // Empty dependency array to run only on mount

  // Render APOD media based on its type
  const renderMedia = () => {
    if (apod.media_type === 'image') {
      return <img src={apod.url} alt={apod.title} style={{ maxWidth: '100%' }} />;
    } else if (apod.media_type === 'video') {
      return (
        <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
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
      return (
        <p>
          Unsupported media type. View it{' '}
          <a href={apod.url} target="_blank" rel="noopener noreferrer">
            here
          </a>.
        </p>
      );
    }
  };

  // Render the widget UI
  return (
    <div className="widget">
      <h2>Astronomy Picture of the Day</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error if any */}
      {apod ? (
        <div>
          <h3>{apod.title}</h3>
          {renderMedia()} {/* Display media */}
          <p>{apod.explanation}</p>
        </div>
      ) : (
        <p>Loading APOD...</p> // Show loading message
      )}
    </div>
  );
};

export default NasaWidget; // Export the component
