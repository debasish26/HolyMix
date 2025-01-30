import React, { useState } from 'react';

const AnimeInfo = ({ animeInfo }: { animeInfo: any }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleReadMore = () => {
        setIsExpanded(!isExpanded);
    };

    const truncateText = (text: string, wordLimit: number) => {
        const words = text.split(' ');
        if (words.length > wordLimit) {
            return words.slice(0, wordLimit).join(' ') + '...';
        }
        return text;
    };

    return (
        <div>
            {/* Title */}
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-2xl font-bold text-white mb-4">
                {animeInfo?.name || 'Loading...'}
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-base md:text-lg lg:text-base text-gray-300">
                {isExpanded
                    ? animeInfo?.description || 'Loading description...'
                    : truncateText(animeInfo?.description || '', 45)}
            </p>

            {/* Read More / Read Less Button */}
            {animeInfo?.description && animeInfo.description.split(' ').length > 45 && (
                <button
                    onClick={toggleReadMore}
                    className="text-blue-500 hover:underline"
                >
                    {isExpanded ? 'Read Less' : 'Read More'}
                </button>
            )}
        </div>
    );
};

export default AnimeInfo;
