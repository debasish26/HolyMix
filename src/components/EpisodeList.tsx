import React from 'react';

const EpisodeList = ({ displayedEpisodes, playVideo, currentEpisode, setCurrentEpisode }: any) => {
    
    const handleEpisodeClick = (episodeId: string, episodeNumber: number) => {
        playVideo(episodeId);  // Play the selected video
        setCurrentEpisode(episodeNumber);  // Update the current episode number to highlight the selected episode
    };

    return (
        <div className="bg-gray-800 rounded-lg overflow-hidden">
            <div className="p-4 border-b border-gray-700">
                <h3 className="text-lg font-semibold text-white">Episodes</h3>
            </div>
            <div className="divide-y divide-gray-700">
                {displayedEpisodes.map((episode: any) => (
                    <button
                        key={episode.episodeId}
                        onClick={() => handleEpisodeClick(episode.episodeId, episode.number)} // Set current episode on click
                        className={`w-full px-4 py-3 flex items-center justify-between hover:bg-gray-700 transition-colors ${currentEpisode === episode.number ? 'bg-gray-700' : ''}`} // Highlight selected episode
                    >
                        <div className="flex items-center space-x-3">
                            <span className="text-red-500 font-medium">EP {episode.number}</span>
                            <span className="text-white">{episode.title}</span>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default EpisodeList;
