import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Carousel } from './components/Carousel';
import { ScrollableRow } from './components/ScrollableRow';
import Navbar from './pages/Navbar';
import Footer from './pages/Footer';
import SearchPage from './pages/SearchPage';
import { AnimePage } from './pages/AnimePage';
import LoginPage from './pages/LoginPage';
import { Play } from 'lucide-react';
import Genres from './pages/Genres';
import Profile from './pages/Profile';
import FAQ from './pages/faq';
const queryClient = new QueryClient();
import AboutUs from './pages/AboutUs';
import ForgotPasswordPage from './components/ForgotPasswordPage';
type Anime = {
    id: string;
    title: string;
    image: string;
};

type RecentlyWatchedAnime = {
    animeId: string;
    animeName: string;
    poster: string;
};
function App() {
    const [spotlightAnimes, setSpotlightAnimes] = useState<Anime[]>([]);
    const [recentlyWatched, setRecentlyWatched] = useState<Anime[]>([]);
    const [popular, setPopular] = useState<Anime[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status

    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        // Check login status
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token); // If token exists, set to true
    }, []);

    useEffect(() => {
        const fetchAnimeData = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/hianime/home`);
                if (!response.ok) throw new Error('Failed to fetch anime data');
                const data = await response.json();

                setSpotlightAnimes(
                    data.data.spotlightAnimes?.map((anime: any) => ({
                        id: anime.id,
                        rank: anime.rank,
                        title: anime.name,
                        image: anime.poster,
                        description: anime.description,
                        subEp: anime.episodes[0],
                        dubEp: anime.episodes[1],
                        type: anime.type,
                        duration: anime.otherInfo[1],
                        released: anime.otherInfo[2],
                        hd: anime.otherInfo[3],
                    })) || []
                );

                setPopular(
                    data.data.topAiringAnimes?.map((anime: any) => ({
                        id: anime.id,
                        title: anime.name,
                        image: anime.poster,
                    })) || []
                );

                setLoading(false);
            } catch (err) {
                console.error('Fetch error:', err);
                setError((err as Error).message);
                setLoading(false);
            }
        };

        fetchAnimeData();
    }, [API_BASE_URL]);

    useEffect(() => {
        if (isLoggedIn) {
            const storedRecentlyWatched = JSON.parse(localStorage.getItem('recentlyWatched') || '[]') as RecentlyWatchedAnime[];
            setRecentlyWatched(
                storedRecentlyWatched.map((anime) => ({
                    id: anime.animeId,
                    title: anime.animeName,
                    image: anime.poster,
                }))
            );
        } else {
            setRecentlyWatched([]);
        }
    }, [isLoggedIn]);
    useEffect(() => {
        const fetchRecentlyWatched = async () => {
            try {
                const userId = localStorage.getItem('userId'); // Retrieve userId from local storage

                if (!userId) return;

                const response = await fetch(`https://holymix-login-backend.onrender.com/recently-watched/${userId}`);
                if (!response.ok) throw new Error('Failed to fetch recently watched anime');

                const data = await response.json();
                setRecentlyWatched(
                    data.recentlyWatched.map((anime: any) => ({
                        id: anime.episodeId,
                        title: anime.title,
                        image: anime.image, // Make sure poster is saved in the database
                    }))
                );
            } catch (err) {
                console.error('Fetch error:', err);
            }
        };

        if (isLoggedIn) {
            fetchRecentlyWatched();
        } else {
            setRecentlyWatched([]);
        }
    }, [isLoggedIn, API_BASE_URL]);

    const updateRecentlyWatched = (anime: Anime) => {
        const newEntry: RecentlyWatchedAnime = {
            animeId: anime.id,
            animeName: anime.title,
            poster: anime.image,
        };

        const storedList = localStorage.getItem('recentlyWatched');
        const existingList = storedList ? JSON.parse(storedList) : [];

        const updatedList = [
            newEntry,
            ...existingList.filter((item: RecentlyWatchedAnime) => item.animeId !== anime.id),
        ].slice(0, 10);

        localStorage.setItem('recentlyWatched', JSON.stringify(updatedList));

        setRecentlyWatched(
            updatedList.map((item: RecentlyWatchedAnime) => ({
                id: item.animeId,
                title: item.animeName,
                image: item.poster,
            }))
        );
    };

    const handleLoginSubmit = (formData: { firstName: string; lastName: string; email: string; password: string }) => {

    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <div className="flex flex-col items-center">
                    <div className="loader"></div>
                    <span className="text-white text-lg mt-4">Loading Holymix...</span>
                    <span className="text-white text-sm mt-4">admin is a pirate...</span>
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
        <QueryClientProvider client={queryClient}>
            <Router>
                <div className="min-h-screen bg-gray-900">
                    <Navbar />

                    <Routes>
                        <Route
                            path="/"
                            element={
                                <main className="pt-16">
                                    {error ? (
                                        <div className="text-red-500 text-center">Error: {error}</div>
                                    ) : (
                                        <>
                                            <section className="mb-8 md:mb-12">
                                                <Carousel items={spotlightAnimes} />
                                            </section>
                                            {/* Conditionally render Recently Watched */}
                                            {isLoggedIn && (
                                                <section className=" px-4 sm:px-6 mb-8 md:mb-12">
                                                    <ScrollableRow title="Continue Watching" items={recentlyWatched} />
                                                </section>
                                            )}
                                            <section className=" px-4 sm:px-6 mb-8 md:mb-12">
                                                <ScrollableRow title="Popular on Holymix" items={popular} />
                                            </section>
                                        </>
                                    )}
                                </main>
                            }
                        />
                        <Route path="/anime/:id" element={<AnimePage onWatch={updateRecentlyWatched} />} />
                        <Route path="/search" element={<SearchPage />} />
                        <Route path="/accounts" element={<LoginPage onSubmit={handleLoginSubmit}
                            logo={<Play className="w-10 h-10 text-blue-500" />}
                            subtitle="Join the best anime community!" />} />
                            <Route path="/genres" element={<Genres />} />
                         <Route path="/profile" element={<Profile />} />
                         <Route path="/faq" element={<FAQ />} />
                         <Route path="/about" element={<AboutUs />} />
                         // Add this to your Routes component
<Route path="/forgot-password" element={<ForgotPasswordPage />} />
                    </Routes>
                    <Footer />
                </div>
            </Router>
        </QueryClientProvider>
    );
}

export default App;
