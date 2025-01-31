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
import { Sparkles, Star, Flame, Swords } from 'lucide-react'
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
            <div className="min-h-screen bg-gradient-to-b from-[#111827]-900 to-grey-900 flex items-center justify-center">
                <div className="flex flex-col items-center px-4">
                    {/* Animated Icons */}
                    <div className="flex gap-4 mb-6 animate-bounce">
                        <Swords className="w-8 h-8 text-red-500" />
                        <Flame className="w-8 h-8 text-orange-500" />
                        <Star className="w-8 h-8 text-yellow-500" />
                        <Sparkles className="w-8 h-8 text-blue-500" />
                    </div>

                    {/* Main Loading Animation */}
                    <div className="relative w-24 h-24 mb-8">
                        <div className="loader-circle"></div>
                        <div className="loader-circle-inner"></div>
                    </div>

                    {/* Loading Text */}
                    <h2 className="text-3xl font-bold text-white mb-4 animate-pulse">
                        Loading Holymix...
                    </h2>

                    {/* Fun Loading Messages */}
                    <div className="text-center">
                        <p className="text-blue-300 text-lg mb-2 animate-fade-in">
                            "Summoning the power of anime... ⚡️"
                        </p>
                        <p className="text-purple-300 text-sm italic animate-fade-in-delay">
                            Preparing your next binge-worthy adventure 🍿
                        </p>
                    </div>

                    {/* Random Anime Facts */}
                    <div className="mt-8 max-w-md text-center">
                        <p className="text-gray-400 text-sm animate-fade-in-delay-2">
                            Did you know? The term "anime" comes from the French word "animé" 🎨
                        </p>
                    </div>
                </div>
                <style>
                    {`
.loader-circle {
                        position: absolute;
                        width: 100%;
                        height: 100%;
                        border: 4px solid rgba(255, 255, 255, 0.1);
                        border-top-color: #3b82f6;
                        border-radius: 50%;
                        animation: spin 1s linear infinite;
                    }

                    .loader-circle-inner {
                        position: absolute;
                        width: 70%;
                        height: 70%;
                        top: 15%;
                        left: 15%;
                        border: 4px solid rgba(255, 255, 255, 0.1);
                        border-bottom-color: #ef4444;
                        border-radius: 50%;
                        animation: spin 0.8s linear infinite reverse;
                    }

                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }

                    @keyframes fade-in {
                        0% { opacity: 0; transform: translateY(10px); }
                        100% { opacity: 1; transform: translateY(0); }
                    }

                    .animate-fade-in {
                        animation: fade-in 0.6s ease-out forwards;
                    }

                    .animate-fade-in-delay {
                        animation: fade-in 0.6s ease-out 0.3s forwards;
                        opacity: 0;
                    }

                    .animate-fade-in-delay-2 {
                        animation: fade-in 0.6s ease-out 0.6s forwards;
                        opacity: 0;
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
