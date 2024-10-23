// src/pages/NasaPage.js
import React, { useEffect, useState } from 'react';

const NasaPage = () => {
  const [apod, setApod] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApod = async () => {
      try {
        const response = await fetch(
          `https://api.nasa.gov/planetary/apod?api_key=0aT1mzRNXlmedoOPgFfORKOJpKCFbdaQXDVyoe8p`
        );
        const data = await response.json();
        setApod(data);
      } catch (error) {
        console.error('Error fetching APOD:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchApod();
  }, []);

  const renderMedia = () => {
    if (apod.media_type === 'image') {
      return <img src={apod.url} alt={apod.title} style={{ maxWidth: '100%' }} />;
    } else if (apod.media_type === 'video') {
      if (apod.url.includes('youtube.com') || apod.url.includes('youtu.be')) {
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
        // If video is from unsupported platform, provide a link
        return (
          <p>
            This video is hosted on an unsupported platform. You can watch it{' '}
            <a href={apod.url} target="_blank" rel="noopener noreferrer">
              here
            </a>.
          </p>
        );
      }
    } else {
      return <p>Unsupported media type. View it <a href={apod.url} target="_blank" rel="noopener noreferrer">here</a>.</p>;
    }
  };

  return (
    <div className="widget">
      <h2>Astronomy Picture of the Day</h2>
      {loading ? (
        <p>Loading APOD...</p>
      ) : apod ? (
        <div>
          <h3>{apod.title}</h3>
          {renderMedia()}
          <p>{apod.explanation}</p>
        </div>
      ) : (
        <p>No APOD available.</p>
      )}
    </div>
  );
};

export default NasaPage;
