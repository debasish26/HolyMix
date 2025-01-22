import React from 'react';
import { SkipBack, SkipForward } from 'lucide-react';

const EpisodePlayer = ({
  displayedEpisodes,
  playVideo,
  currentEpisode,
  setCurrentEpisode,
  selectedVersion,
  setSelectedVersion,
  selectedRange,
  handleRangeChange
}: any) => {
  const handleEpisodeClick = (episodeId: string, episodeNumber: number) => {
    playVideo(episodeId);  // Play the selected video
    setCurrentEpisode(episodeNumber);  // Update the current episode number to highlight the selected episode
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="relative">


          {/* Episode Controls */}
          <div className="bg-gray-800 rounded-lg p-4 mb-6 mt-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex space-x-4">
                <button
                  onClick={() => setSelectedVersion('sub')}
                  className={`px-4 py-2 rounded-md ${selectedVersion === 'sub' ? 'bg-red-600 text-white' : 'bg-gray-700 text-gray-300'}`}
                >
                  SUB
                </button>
                <button
                  onClick={() => setSelectedVersion('dub')}
                  className={`px-4 py-2 rounded-md ${selectedVersion === 'dub' ? 'bg-red-600 text-white' : 'bg-gray-700 text-gray-300'}`}
                >
                  DUB
                </button>
              </div>
              <div className="flex items-center space-x-2 text-white">
                <button
                  className="p-1 hover:text-red-500"
                  onClick={() => {
                                                          setCurrentEpisode((prev) => {
                                                              const newEpisode = Math.max(selectedRange[0], prev - 1);
                                                              const episode = displayedEpisodes.find((ep: any) => ep.number === newEpisode);
                                                              if (episode) playVideo(episode.episodeId); // Ensure playVideo is called with correct episodeId
                                                              return newEpisode;
                                                          });
                                                        }}
                >
                  <SkipBack size={20} />
                </button>
                <span>Episode {currentEpisode}</span>
                <button
                  className="p-1 hover:text-red-500"
                  onClick={() => {
                    setCurrentEpisode((prev) => {
                        const newEpisode = Math.min(selectedRange[1], prev + 1);
                        const episode = displayedEpisodes.find((ep: any) => ep.number === newEpisode);
                        if (episode) playVideo(episode.episodeId); // Ensure playVideo is called with correct episodeId
                        return newEpisode;
                    });
                }}
                >
                  <SkipForward size={20} />
                </button>
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="episode-range" className="text-white block mb-2">Select Episode Range:</label>
              <select
                id="episode-range"
                className="bg-gray-700 text-white px-4 py-2 rounded-md w-full"
                onChange={(e) => handleRangeChange(e.target.value)}
              >
                <option value="1-20">1 - 20</option>
                <option value="21-40">21 - 40</option>
                <option value="41-60">41 - 60</option>
                <option value="61-80">61 - 80</option>
              </select>
            </div>
          </div>
          <div className="bg-gray-800 rounded-lg overflow-hidden">
            {/* Episode List */}
            <div className="p-4 border-b border-gray-700">
              <h3 className="text-lg font-semibold text-white">Episodes</h3>
            </div>
            <div className="divide-y divide-gray-700">
              {displayedEpisodes.map((episode: any) => (
                <button
                  key={episode.episodeId}
                  onClick={() => handleEpisodeClick(episode.episodeId, episode.number)}
                  className={`w-full px-4 py-3 flex items-center justify-between hover:bg-gray-700 transition-colors ${currentEpisode === episode.number ? 'bg-gray-700' : ''}`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-red-500 font-medium">EP {episode.number}</span>
                    <span className="text-white">{episode.title}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EpisodePlayer;
