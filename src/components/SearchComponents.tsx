import React from 'react';
import { AnimeCard } from './AnimeCard';

interface GridDisplayProps {
  title: string;
  items: {
    title: string;
    image: string;
    episodes: number;
    rating: number;
  }[];
}

export function SearchComponents({ title, items }: GridDisplayProps) {
  return (
    <div className="relative">

      <div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6"
      >

        {items.map((anime) => (
          <div key={anime.title} className="flex-none items-center w-[200px] sm:w-[250px] md:w-[300px]">
            <AnimeCard {...anime} />
          </div>
        ))}
      </div>
    </div>
  );
}
