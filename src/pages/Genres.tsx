import React, { useState,useCallback  } from 'react';
import { Sword, Mountain, Car, Laugh, Brain, Ghost, Theater, Heart, Wand2, GamepadIcon, Crown, Scroll, Skull, UserRound as Rose, Baby, Magnet as Magic, Swords, Notebook as Robot, Guitar as Military, Music, Search, Shield, Slice as Police, Brain as PsychologyIcon, HeartHandshake, School, Rocket, Users, Dumbbell, Zap, Moon, Film } from 'lucide-react';
import { SearchComponents } from '../components/SearchComponents';
import {debounce} from "lodash"; // Import debounce from lodash for optimization

const Genres = () => {
    const [loading, setLoading] = useState(false);
    const [genreAnime, setGenreAnime] = useState([]);
    const [error, setError] = useState("");
    const [genreName, setGenreName] = useState("");

  const genres = [
    { name: 'Action', icon: <Sword size={16} />, color: 'bg-red-500' },
    { name: 'Adventure', icon: <Mountain size={16} />, color: 'bg-green-600' },
    { name: 'Cars', icon: <Car size={16} />, color: 'bg-gray-600' },
    { name: 'Comedy', icon: <Laugh size={16} />, color: 'bg-yellow-500' },
    { name: 'Dementia', icon: <Brain size={16} />, color: 'bg-purple-600' },
    { name: 'Demons', icon: <Ghost size={16} />, color: 'bg-red-800' },
    { name: 'Drama', icon: <Theater size={16} />, color: 'bg-blue-600' },
    { name: 'Ecchi', icon: <Heart size={16} />, color: 'bg-pink-400' },
    { name: 'Fantasy', icon: <Wand2 size={16} />, color: 'bg-indigo-500' },
    { name: 'Game', icon: <GamepadIcon size={16} />, color: 'bg-orange-500' },
    { name: 'Harem', icon: <Crown size={16} />, color: 'bg-pink-600' },
    { name: 'Historical', icon: <Scroll size={16} />, color: 'bg-amber-700' },
    { name: 'Horror', icon: <Skull size={16} />, color: 'bg-gray-900' },
    { name: 'Isekai', icon: <Rose size={16} />, color: 'bg-emerald-500' },
    { name: 'Josei', icon: <Baby size={16} />, color: 'bg-purple-400' },
    { name: 'Kids', icon: <Baby size={16} />, color: 'bg-cyan-400' },
    { name: 'Magic', icon: <Magic size={16} />, color: 'bg-violet-500' },
    { name: 'Mecha', icon: <Robot size={16} />, color: 'bg-zinc-700' },
    { name: 'Military', icon: <Military size={16} />, color: 'bg-green-800' },
    { name: 'Music', icon: <Music size={16} />, color: 'bg-blue-400' },
    { name: 'Mystery', icon: <Search size={16} />, color: 'bg-indigo-700' },
    { name: 'Parody', icon: <Laugh size={16} />, color: 'bg-amber-500' },
    { name: 'Police', icon: <Police size={16} />, color: 'bg-blue-800' },
    { name: 'Psychological', icon: <PsychologyIcon size={16} />, color: 'bg-purple-800' },
    { name: 'Romance', icon: <HeartHandshake size={16} />, color: 'bg-red-400' },
    { name: 'Samurai', icon: <Swords size={16} />, color: 'bg-red-700' },
    { name: 'School', icon: <School size={16} />, color: 'bg-blue-500' },
    { name: 'Sci-Fi', icon: <Rocket size={16} />, color: 'bg-cyan-600' },
    { name: 'Seinen', icon: <Users size={16} />, color: 'bg-slate-600' },
    { name: 'Shoujo', icon: <Heart size={16} />, color: 'bg-pink-500' },
    { name: 'Shounen', icon: <Dumbbell size={16} />, color: 'bg-orange-600' },
    { name: 'Space', icon: <Rocket size={16} />, color: 'bg-slate-800' },
    { name: 'Sports', icon: <Dumbbell size={16} />, color: 'bg-emerald-600' },
    { name: 'Supernatural', icon: <Moon size={16} />, color: 'bg-violet-600' },
    { name: 'Thriller', icon: <Skull size={16} />, color: 'bg-red-900' },
    { name: 'Vampire', icon: <Ghost size={16} />, color: 'bg-purple-900' }
  ];

// Fetch anime by genre
const fetchGenreData = useCallback(
    debounce(async (genre) => {
      setGenreName(genre);
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`https://holymix-backend.onrender.com/api/genre/${genre.toLowerCase()}`);
        const data = await response.json();
        setGenreAnime(data.data.animes?.map(anime => ({
          id: anime.id,
          title: anime.name,
          image: anime.poster,
          episodes: anime.episodes[0],
          rating: anime.duration
        })) || []);
      } catch (error) {
        setError("Failed to fetch data. Please try again.");
      } finally {
        setLoading(false);
      }
    }, 500), [] // 500ms debounce to reduce unnecessary API calls
  );


  return (
    <div className="bg-cover bg-center py-20 bg-fixed" style={{
      backgroundImage: `linear-gradient(to bottom, rgba(2, 6, 23, 0.95), rgba(2, 6, 23, 0.95)))`,
    }}>
      <div className="p-6">
        <div className="max-w-7xl mx-auto bg-gray-900/60 backdrop-blur-sm rounded-xl p-6 shadow-2xl">
          <h2 className="text-2xl font-bold text-white mb-4">Genre</h2>
          <div className="flex flex-wrap gap-2">
            {genres.map((genre) => (
              <button
                key={genre.name}
                className={`${genre.color} hover:opacity-90 transition-all duration-200 text-white px-4 py-2 rounded-lg flex items-center space-x-2 text-sm`}
                onClick={() => fetchGenreData(genre.name)}
              >
                {genre.icon}
                <span>{genre.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <section className="pt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 md:mb-12">
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : loading ? (
          <div className="flex justify-center items-center text-white">
            <span className="animate-spin border-t-4 border-white border-solid rounded-full h-10 w-10"></span>
            <p className="ml-3">Loading...</p>
          </div>
        ) : genreAnime.length > 0 ? (
          <SearchComponents title={`Results for "${genreName}"`} items={genreAnime} />
        ) : (
          <p className='text-white'>No results found for "{genreName}".</p>
        )}
      </section>
    </div>
  );
}

export default Genres;
