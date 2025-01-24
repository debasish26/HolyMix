import React, { useCallback, useEffect } from 'react';
import { SkipBack, SkipForward } from 'lucide-react';

const EpisodePlayer = ({
    displayedEpisodes,
    playVideo,
    currentEpisode,
    setCurrentEpisode,
    selectedVersion,
    setSelectedVersion,
    selectedRange,
    handleRangeChange,
    animeInfoData
}: any) => {
    // Get available episodes for sub and dub
    const availableEpisodes = animeInfoData?.data?.anime?.info?.stats?.episodes || { sub: 0, dub: 0 };

    useEffect(() => {
        // Ensure currentEpisode is within valid range for the selected version
        const maxAvailableEpisodes = selectedVersion === 'sub' ? availableEpisodes.sub : availableEpisodes.dub;

        if (currentEpisode > maxAvailableEpisodes) {
            setCurrentEpisode(maxAvailableEpisodes); // Only adjust if out of range
        }
    }, [selectedVersion, availableEpisodes, currentEpisode, setCurrentEpisode]);

    const handleVersionChange = (version: 'sub' | 'dub') => {
        // Update the version without affecting playback
        setSelectedVersion(version);
    };


    // Filter episodes based on the selected version and range
    const filteredEpisodes = displayedEpisodes.filter((episode: any) => {
        return episode.number >= selectedRange[0] &&
            episode.number <= selectedRange[1] &&
            episode.number <= (selectedVersion === 'sub' ? availableEpisodes.sub : availableEpisodes.dub);
    });

    const handleEpisodeClick = useCallback(
        (episodeId: string, episodeNumber: number) => {
            console.log('Playing episode:', episodeId);
            console.log('Setting current episode:', episodeNumber);
            playVideo(episodeId, selectedVersion); // This is only triggered by explicit episode click
            setCurrentEpisode(episodeNumber);
        },
        [playVideo, setCurrentEpisode, selectedVersion]
    );


    const handleForwardClick = () => {
        setCurrentEpisode((prev) => {
            const nextEpisode = Math.min(selectedRange[1], prev + 1);
            const episode = filteredEpisodes.find((ep: any) => ep.number === nextEpisode);
            if (episode) {
                playVideo(episode.episodeId, selectedVersion);
            }
            return nextEpisode;
        });

        if (currentEpisode === selectedRange[1]) {
            const newStart = selectedRange[1] + 1;
            const newEnd = selectedRange[1] + 20;
            handleRangeChange(`${newStart}-${newEnd}`);
        }
    };

    const handleBackClick = () => {
        setCurrentEpisode((prev) => {
            const prevEpisode = Math.max(selectedRange[0], prev - 1);
            const episode = filteredEpisodes.find((ep: any) => ep.number === prevEpisode);
            if (episode) {
                playVideo(episode.episodeId, selectedVersion);
            }
            return prevEpisode;
        });

        if (currentEpisode === selectedRange[0]) {
            const newStart = Math.max(1, selectedRange[0] - 20);
            const newEnd = selectedRange[0] - 1;
            handleRangeChange(`${newStart}-${newEnd}`);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900">
            <div className="max-w-7xl mx-auto py-8">
                <div className="relative">
                    {/* Episode Controls */}
                    <div className="bg-gray-800 rounded-lg p-4 mb-6 mt-6">
                        <div className="flex flex-wrap items-center justify-between gap-4 sm:gap-6 my-3">
                            {/* SUB and DUB Buttons */}
                            <div className="flex flex-wrap space-x-2 sm:space-x-4">
                                <button
                                    onClick={() => handleVersionChange('sub')}
                                    className={`px-2 sm:px-4 py-2 sm:py-2 rounded-md text-xs sm:text-sm md:text-base ${selectedVersion === 'sub' ? 'bg-red-600 text-white' : 'bg-gray-700 text-gray-300'
                                        }`}
                                >
                                    SUB ({availableEpisodes.sub} Episodes)
                                </button>
                                <button
                                    onClick={() => handleVersionChange('dub')}
                                    className={`px-2 sm:px-4 py-1 sm:py-2 rounded-md text-xs sm:text-sm md:text-base ${selectedVersion === 'dub' ? 'bg-red-600 text-white' : 'bg-gray-700 text-gray-300'
                                        }`}
                                >
                                    DUB ({availableEpisodes.dub} Episodes)
                                </button>
                            </div>

                            {/* Episode Controls */}
                            <div className="flex items-center space-x-2 sm:space-x-3 text-white">
                                <button className="p-1 sm:p-2 hover:text-red-500" onClick={handleBackClick}>
                                    <SkipBack className="w-4 h-4 sm:w-5 sm:h-5" />
                                </button>
                                <span className="text-xs sm:text-sm md:text-base">Episode {currentEpisode}</span>
                                <button className="p-1 sm:p-2 hover:text-red-500" onClick={handleForwardClick}>
                                    <SkipForward className="w-4 h-4 sm:w-5 sm:h-5" />
                                </button>
                            </div>
                        </div>


                        {/* Episode Range Selector */}
                        <div className="mb-4">
                            <label htmlFor="episode-range" className="text-white block mb-2 text-sm sm:text-base md:text-lg">Select Episode Range:</label>
                            <select
                                id="episode-range"
                                className="bg-gray-700 text-white px-4 py-2 rounded-md w-full text-sm sm:text-base"
                                onChange={(e) => handleRangeChange(e.target.value)}
                            >
                                <option value="1-20">1 - 20</option>
                                <option value="21-40">21 - 40</option>
                                <option value="41-60">41 - 60</option>
                                <option value="61-80">61 - 80</option>
                            </select>
                        </div>
                    </div>

                    {/* Episode List */}
                    <div className="bg-gray-800 rounded-lg overflow-hidden">
                        <div className="p-4 border-b border-gray-700">
                            <h3 className="text-lg sm:text-xl font-semibold text-white">Episodes</h3>
                        </div>
                        <div className="divide-y divide-gray-700">
                            {filteredEpisodes.map((episode: any) => (
                                <button
                                    key={episode.episodeId}
                                    onClick={() => handleEpisodeClick(episode.episodeId, episode.number)}
                                    className={`w-full px-4 py-3 flex items-center hover:bg-gray-700 transition-colors ${currentEpisode === episode.number ? 'bg-gray-700' : ''}`}
                                >
                                    <div className="flex items-center justify-start space-x-3 w-full">
                                        <span className="text-red-500 font-medium text-xs sm:text-sm md:text-sm lg:text-base flex-shrink-0">
                                            EP {episode.number}
                                        </span>
                                        <span className="text-white text-xs sm:text-sm md:text-sm lg:text-base truncate">
                                            {episode.title}
                                        </span>
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
