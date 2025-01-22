import React, { useState , useEffect } from 'react';
import { Search, Bell, Facebook, Twitter, Instagram, Youtube, Mail, Menu, X } from 'lucide-react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Carousel } from './components/Carousel';
import { ScrollableRow } from './components/ScrollableRow';
import { AnimePage } from './pages/AnimePage';
import Navbar from './pages/Navbar';
import Footer from './pages/Footer';
import SearchPage from './pages/SearchPage';
import { QueryClient, QueryClientProvider } from 'react-query';
const queryClient = new QueryClient();
function App() {
    const [spotlightAnimes, setSpotlightAnimes] = useState([]);
  const [recentlyWatched, setRecentlyWatched] = useState([]);
  const [popular, setPopular] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  useEffect(() => {
    const fetchAnimeData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/hianime/home`);
        if (!response.ok) {
          throw new Error("Failed to fetch anime data");
        }
        const data = await response.json();
        console.log("data",data);
        setSpotlightAnimes(data.data.spotlightAnimes?.map(anime => ({
            id: anime.id,
            title: anime.name,
            image: anime.poster,
          })) || []);

        setRecentlyWatched(data.data.latestEpisodeAnimes?.map(anime => ({
          id: anime.id,
          title: anime.name,
          image: anime.poster,
        })) || []);

        setPopular(data.data.topAiringAnimes?.map(anime => ({
          id: anime.id,
          title: anime.name,
          image: anime.poster,
        })) || []);

        setLoading(false);
      } catch (error) {
        console.error("Fetch error:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchAnimeData();
  }, []);
  useEffect(() => {
    console.log("Updated spotlightAnimes:", spotlightAnimes);
  }, [spotlightAnimes]); // Runs when spotlightAnimes updates
  return (
    <QueryClientProvider client={queryClient}>
    <Router>
    <div className="min-h-screen bg-gray-900">
      {/* Navigation */}
      <Navbar />
      <Routes>
          <Route
            path="/"
            element={
              <main className="pt-16">
                {loading ? (
                  <div className="text-white text-center">Loading...</div>
                ) : error ? (
                  <div className="text-red-500 text-center">Error: {error}</div>
                ) : (
                  <>
                    <section className="mb-8 md:mb-12">
                        <Carousel items={spotlightAnimes} />
                      </section>
                    {/* Recently Watched Section */}
                    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 md:mb-12">
                      <ScrollableRow
                        title="Continue Watching"
                        items={recentlyWatched}
                      />
                    </section>
                    {/* Popular Section */}
                    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 md:mb-12">
                      <ScrollableRow
                        title="Popular on AnimeStream"
                        items={popular}
                      />
                    </section>
                  </>
                )}
              </main>
            }
          />
          <Route path="/anime/:id" element={<AnimePage />} />
          <Route path="/search" element={<SearchPage />} />
        </Routes>

            {/* Footer */}
            <Footer />

    </div>
    </Router>
    </QueryClientProvider>
  );
}

export default App;
