import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CarouselProps {
  items: {
    id: number;
    title: string;
    image: string;
    description: string;
  }[];
}

export function Carousel({ items }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((current) => (current + 1) % items.length);
  };

  const prev = () => {
    setCurrentIndex((current) => (current - 1 + items.length) % items.length);
  };

  return (
    <div className="relative h-[300px] sm:h-[400px] md:h-[500px] w-full overflow-hidden">
      <div
        className="absolute inset-0 transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {items.map((item) => (
          <div
            key={item.id}
            className="absolute top-0 h-full w-full"
            style={{ left: `${item.id * 100}%` }}
          >
            <img
              src={item.image}
              alt={item.title}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
            <div className="absolute bottom-0 left-0 p-4 sm:p-6 md:p-8">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 sm:mb-4">{item.title}</h2>
              <p className="text-gray-200 max-w-2xl text-sm sm:text-base hidden sm:block">{item.description}</p>
              <Link
                to={`/anime/${item.id}`}
                className="inline-block mt-2 sm:mt-4 bg-red-600 text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm sm:text-base"
              >
                Watch Now
              </Link>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={prev}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-black/50 p-1 sm:p-2 rounded-full text-white hover:bg-black/75"
      >
        <ChevronLeft size={20} className="sm:w-6 sm:h-6" />
      </button>
      <button
        onClick={next}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-black/50 p-1 sm:p-2 rounded-full text-white hover:bg-black/75"
      >
        <ChevronRight size={20} className="sm:w-6 sm:h-6" />
      </button>
    </div>
  );
}
