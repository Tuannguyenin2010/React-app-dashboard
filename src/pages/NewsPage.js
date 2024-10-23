// src/pages/NewsPage.js
import React, { useEffect, useState } from 'react';

const NewsPage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          `https://newsapi.org/v2/top-headlines?country=us&apiKey=b200896064914ff58f3171e8c290571c`
        );
        const data = await response.json();
        setArticles(data.articles);
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  return (
    <div className="widget">
      <h2>Latest News</h2>
      {loading ? (
        <p>Loading news articles...</p>
      ) : articles.length > 0 ? (
        <ul>
          {articles.map((article, index) => (
            <li key={index}>
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                {article.title}
              </a>
              <p>{article.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No news articles available.</p>
      )}
    </div>
  );
};

export default NewsPage;
