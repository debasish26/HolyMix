import React from 'react';
import { Clock, Film, Heart } from 'lucide-react';

interface ProfileStatsProps {
    watchTime: number;
    stats: {
        watchedAnime: number;
        watchlistCount: number;
    };
}

function formatWatchTime(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    if (hours > 0) {
        return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
}

const ProfileStats = ({ watchTime, stats }: ProfileStatsProps) => {
    return (
        <div className="bg-gray-800 text-white rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Statistics</h2>
            <div className="grid grid-cols-1 gap-4">
                <StatCard
                    icon={<Clock className="w-5 h-5 text-red-500" />}
                    label="Watch Time"
                    value={formatWatchTime(watchTime)}
                />
                <StatCard
                    icon={<Film className="w-5 h-5 text-red-500" />}
                    label="Completed"
                    value={`${stats.watchedAnime}`}
                />
                <StatCard
                    icon={<Heart className="w-5 h-5 text-red-500" />}
                    label="Watchlist"
                    value={`${stats.watchlistCount}`}
                />
            </div>
        </div>
    );
};

const StatCard = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
    <div className="flex items-center gap-4 bg-gray-700 rounded-lg p-4">
        {icon}
        <div>
            <div className="text-sm text-gray-400">{label}</div>
            <div className="font-bold">{value}</div>
        </div>
    </div>
);

export default ProfileStats;
