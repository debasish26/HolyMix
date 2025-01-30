import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Star, PlayCircle } from 'lucide-react';
import { AnimeCard } from './AnimeCard';

interface ScrollableRowProps {
  title: string;
  items: {
    title: string;
    image: string;
    episodes: number;
    rating: number;
  }[];
}

export function ScrollableRow({ title, items }: ScrollableRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const containerWidth = scrollRef.current.clientWidth;
      const scrollAmount = direction === 'left' ? -containerWidth : containerWidth;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.touches[0].clientX;
    const difference = touchStartX - touchEndX;

    if (difference > 50) {
      scroll('right');
      setTouchStartX(null);
    } else if (difference < -50) {
      scroll('left');
      setTouchStartX(null);
    }
  };

  const handleTouchEnd = () => {
    setTouchStartX(null);
  };

  return (
    <div className="relative bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 p-6  shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className=" text-white flex items-center gap-2
        text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6
        ">
          <PlayCircle className="text-red-500 w-7 h-7" />
          {title}
        </h2>
        {/* Buttons */}
        <div className="flex space-x-3">
          <button
            onClick={() => scroll('left')}
            className="bg-red-600 hover:bg-[#111827]-700 text-white p-2 sm:p-3 rounded-full shadow-md transition-all transform hover:scale-105"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={() => scroll('right')}
            className="bg-red-600 hover:bg-[#111827]-700 text-white p-2 sm:p-3 rounded-full shadow-md transition-all transform hover:scale-105"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
      {/* Scrollable Row */}
      <div
        ref={scrollRef}
        className="flex space-x-4 md:space-x-6 overflow-x-hidden scroll-smooth"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
          {items.map((anime) => (
            <div
              key={anime.title}
              className="flex-none basis-[40%] sm:basis-[30%] md:basis-[25%] lg:basis-[20%] max-w-[250px] min-w-[150px]"
            >
              <AnimeCard {...anime} />
            </div>
          ))}
      </div>
    </div>
  );
}
