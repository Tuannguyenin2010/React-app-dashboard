// src/components/NewsWidget.js
import React, { useEffect, useState } from 'react';

const NewsWidget = () => {
  const [news, setNews] = useState([]); // Store news articles
  const [error, setError] = useState(''); // Store fetch errors

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const apiKey = 'b200896064914ff58f3171e8c290571c'; // Replace with your NewsAPI key
        const response = await fetch(
          `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch news. Status: ${response.status}`);
        }
        const data = await response.json();
        setNews(data.articles); // Store articles in state
      } catch (error) {
        console.error('Error fetching news:', error);
        setError('Unable to fetch news. Please try again later.');
      }
    };
    fetchNews();
  }, []);

  return (
    <div className="widget">
      <h2>Top News</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {news.length > 0 ? (
          news.slice(0, 5).map((article, index) => (
            <li key={index}>
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                {article.title}
              </a>
            </li>
          ))
        ) : (
          <p>Loading news...</p>
        )}
      </ul>
    </div>
  );
};

export default NewsWidget;
