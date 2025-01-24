import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Clock, Calendar, Tv, Mic, Subtitles, Play } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CarouselProps {
    items: {
        id: number;
        rank: number;
        title: string;
        image: string;
        description: string;
        subEp: number;
        dubEp: number;
        type: string;
        duration: string;
        released: string;
        hd: string;
    }[];
    autoPlay?: boolean;
    autoPlayInterval?: number;
}

export function Carousel({
    items,
    autoPlay = false,
    autoPlayInterval = 5000,
}: CarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const next = () => {
        setCurrentIndex((current) => (current + 1) % items.length);
    };

    const prev = () => {
        setCurrentIndex((current) => (current - 1 + items.length) % items.length);
    };

    useEffect(() => {
        if (autoPlay) {
            const interval = setInterval(next, autoPlayInterval);
            return () => clearInterval(interval);
        }
    }, [autoPlay, autoPlayInterval]);

    const spotlightColors = ['bg-teal-600/60', 'bg-blue-600/60', 'bg-green-600/60', 'bg-purple-600/60', 'bg-yellow-600/60','bg-pink-600/60','bg-indigo-600/60','bg-red-600/40','bg-gray-600/60','bg-orange-600/60'];

    return (
        <div className="relative w-full overflow-hidden">
            {/* Slides */}
            <div
                className="flex flex-nowrap transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {items.map((item, index) => (
                    <div key={item.id} className="w-full flex-shrink-0 relative">
                        <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-[50vh] sm:h-[400px] md:h-[65vh] object-cover"
                        />
                        <div className="absolute inset-0">
                            <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-transparent to-transparent" />
                            <div className="absolute inset-0 bg-gradient-to-r from-[#111827]/90 via-transparent to-[#111827]/80" />
                            <div className="absolute inset-0 bg-gradient-to-l from-[#111827]/90 via-transparent to-[#111827]/80" />
                        </div>
                        <div className={`absolute top-4 left-4 ${spotlightColors[index % spotlightColors.length]} text-white px-3 py-1 rounded-lg text-md`}>
                            #{item.rank} Spotlight
                        </div>
                        <div className="absolute bottom-0 left-0 p-4 sm:p-6 md:p-8 text-white">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4">
                                {item.title}
                            </h2>
                            <div className="flex items-center gap-4 text-sm sm:text-base">
                                <span className="flex items-center gap-1"><Tv size={18} /> {item.type}</span>
                                <span className="flex items-center gap-1"><Calendar size={18} /> {item.released}</span>
                                <span className="flex items-center gap-1"><Clock size={18} /> {item.duration}</span>
                                <span className="px-2 py-1 bg-yellow-500/80 text-black font-bold rounded-lg">{item.hd}</span>
                            </div>
                            <div className="flex items-center gap-4 mt-2">
                                <span className="flex items-center gap-1 text-green-400"><Subtitles size={18} /> {item.subEp} Sub</span>
                                <span className="flex items-center gap-1 text-blue-400"><Mic size={18} /> {item.dubEp} Dub</span>
                            </div>
                            <p className="text-gray-200 max-w-2xl text-sm sm:text-base mt-2 sm:mt-2 line-clamp-3">
                                {item.description.slice(0, 180)}...
                            </p>
                            <Link
                                to={`/anime/${item.id}`}
                                className={`inline-flex items-center mt-2 sm:mt-4 ${spotlightColors[index % spotlightColors.length]} text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm sm:text-base`}
                            >
                                <Play size={20} className="mr-2" /> Watch Now
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
            {/* Navigation Buttons - Bottom Right */}
            <div className="absolute bottom-4 right-4 flex space-x-2">
                <button
                    onClick={prev}
                    className="bg-black/50 p-2 rounded-full text-white hover:bg-black/75"
                >
                    <ChevronLeft size={24} />
                </button>
                <button
                    onClick={next}
                    className="bg-black/50 p-2 rounded-full text-white hover:bg-black/75"
                >
                    <ChevronRight size={24} />
                </button>
            </div>
        </div>
    );
}
