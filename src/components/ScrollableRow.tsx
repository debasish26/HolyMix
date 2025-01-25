import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
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

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const containerWidth = scrollRef.current.clientWidth;
      const scrollAmount = direction === 'left' ? -containerWidth : containerWidth;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative">
      <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">{title}</h2>
      <div className="relative group">
        <div
          ref={scrollRef}
          className="flex space-x-4 md:space-x-6 overflow-x-hidden scroll-smooth"
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
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/50 p-1 sm:p-2 rounded-full text-white hover:bg-black/75 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ChevronLeft size={20} className="sm:w-6 sm:h-6" />
        </button>
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/50 p-1 sm:p-2 rounded-full text-white hover:bg-black/75 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ChevronRight size={20} className="sm:w-6 sm:h-6" />
        </button>
      </div>
    </div>
  );
}
