import React from 'react';

const SidebarDetails = ({ animeInfo, selectedVersion }: { animeInfo: any; selectedVersion: string }) => {
    return (
        <div className="space-y-6 pt-1 sm:pt-1 md:pt-2">
            <div className="bg-gray-800 rounded-lg p-4">
                <h3 className="text-base sm:text-lg font-semibold text-white mb-4">Details</h3>
                <div className="space-y-2 text-xs sm:text-sm">
                    <div className="flex justify-between">
                        <span className="text-gray-400">Rating:</span>
                        <span className="text-white">{animeInfo?.stats?.rating || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-400">Episodes:</span>
                        <span className="text-white">
                            {animeInfo?.stats?.episodes[selectedVersion] || 'N/A'}
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-400">Type:</span>
                        <span className="text-white">
                            {animeInfo?.stats?.type || 'N/A'}
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-400">Duration:</span>
                        <span className="text-white">
                            {animeInfo?.stats?.duration || 'N/A'}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SidebarDetails;
