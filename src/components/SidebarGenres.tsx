import React from 'react';

const SidebarGenres = ({ genres }: { genres: string[] | undefined }) => {
    if (!genres || genres.length === 0) return null;

    return (
        <div className="space-y-6">
<div className="bg-gray-800 rounded-lg p-4">
                            <h3 className="text-lg font-semibold text-white mb-4">Genres</h3>
                            <div className="flex flex-wrap gap-2">
                                {genres?.map((genre: string, index: number) => (
                                    <span key={index} className="px-3 py-1 bg-gray-700 text-white rounded-full text-sm">
                                        {genre}
                                    </span>
                                ))}
                            </div>
                        </div>
                        </div>
    );
};

export default SidebarGenres;
