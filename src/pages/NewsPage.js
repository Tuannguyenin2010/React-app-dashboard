// src/pages/NewsPage.js
import React, { useEffect, useState } from 'react';

const NewsPage = () => {
  const [articles, setArticles] = useState([]); // Store news articles
  const [loading, setLoading] = useState(true); // Track loading state

  // Fetch news articles when the component mounts
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          `https://newsapi.org/v2/top-headlines?country=us&apiKey=b200896064914ff58f3171e8c290571c`
        );
        const data = await response.json();
        setArticles(data.articles); // Store fetched articles
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false); // Stop loading indicator
      }
    };
    fetchNews();
  }, []); // Run once on mount

  // Render the news articles or appropriate messages
  return (
    <div className="widget">
      <h2>Latest News</h2>
      {loading ? (
        <p>Loading news articles...</p> // Show loading message
      ) : articles.length > 0 ? (
        <ul>
          {articles.map((article, index) => (
            <li key={index}>
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                {article.title} {/* Display article title */}
              </a>
              <p>{article.description}</p> {/* Display article description */}
            </li>
          ))}
        </ul>
      ) : (
        <p>No news articles available.</p> // Handle missing articles
      )}
    </div>
  );
};

export default NewsPage; // Export the component
