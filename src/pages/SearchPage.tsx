import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { SearchComponents } from '../components/SearchComponents';
import { useLocation } from 'react-router-dom';

const SearchPage = () => {
  const [searchAnime, setSearchAnime] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get the query from the URL
  const { search } = useLocation();
  const query = new URLSearchParams(search).get('query'); // Extract 'query' parameter
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchAnimeData = async () => {
      if (!query) return; // Avoid making requests if query is null
      setLoading(true); // Set loading state to true for each new query
      setError(null); // Clear any previous errors

      try {
        const response = await fetch(`${API_BASE_URL}/search/${query}`);
        if (!response.ok) {
          throw new Error('Failed to fetch anime data');
        }
        const data = await response.json();

        setSearchAnime(
          data.data.suggestions?.map((anime) => ({
            id: anime.id,
            title: anime.name,
            image: anime.poster,
            episodes: anime.moreInfo[2],
            rating: anime.moreInfo[1],
          })) || []
        );

        setLoading(false);
      } catch (error) {
        console.error('Fetch error:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchAnimeData();
  }, [query]); // Add `query` as a dependency

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="loader"></div>
          <span className="text-white text-lg mt-4">Searching {query}...</span>
        </div>
        <style>
          {`
          .loader {
              width: 50px;
              height: 50px;
              border: 5px solid rgba(255, 255, 255, 0.2);
              border-top-color: white;
              border-radius: 50%;
              animation: spin 1s linear infinite;
          }
          @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
          }
          `}
        </style>
      </div>
    );
  }

  return (
    <>
      <section>
        <Navbar />
      </section>
      <section className="pt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 md:mb-12">
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : searchAnime.length > 0 ? (
          <SearchComponents title={`Results for "${query}"`} items={searchAnime} />
        ) : (
          <p>No results found for "{query}".</p>
        )}
      </section>
    </>
  );
};

export default SearchPage;
