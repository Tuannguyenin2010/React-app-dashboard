// src/components/NasaWidget.js
import React, { useEffect, useState } from 'react';

const NasaWidget = () => {
  const [apod, setApod] = useState(null); // Store APOD data
  const [error, setError] = useState(''); // Store fetch errors

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
        setApod(data); // Store APOD data in state
      } catch (error) {
        console.error('Error fetching APOD:', error);
        setError('Unable to fetch APOD. Please try again later.');
      }
    };
    fetchApod();
  }, []);

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
          Unsupported media type. View it <a href={apod.url} target="_blank" rel="noopener noreferrer">here</a>.
        </p>
      );
    }
  };

  return (
    <div className="widget">
      <h2>Astronomy Picture of the Day</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {apod ? (
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

export default NasaWidget;
