import React from 'react';
import { Play } from 'lucide-react';
import { Link } from 'react-router-dom';
interface AnimeCardProps {
    id: string;
    title: string;
    image: string;
    episodes: number;
    rating: number;
}

export function AnimeCard({id, title, image, episodes, rating }: AnimeCardProps) {
    return (
        <div className="relative group cursor-pointer">
            <Link
                to={`/anime/${id}`}
            >
                <div className="relative overflow-hidden rounded-lg">
        <img
          src={image}
          alt={title}
          className="w-full aspect-[3/4] object-cover transform transition-transform group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all flex items-center justify-center">
          <Play className="text-white opacity-0 group-hover:opacity-100 transition-opacity" size={32} />
        </div>
      </div>
      <div className="mt-2">
        <h3 className="text-white font-medium truncate text-sm sm:text-base">{title}</h3>
        <div className="flex items-center justify-between text-gray-400 text-xs sm:text-sm">
          <span>{episodes} </span>
          <span>{rating}</span>
        </div>
      </div>
            </Link>
        </div>
    );
}
