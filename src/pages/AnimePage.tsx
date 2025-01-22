import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import AnimeVideoPlayer from '../components/AnimeVideoPlayer';
import AnimeInfo from '../components/AnimeInfo';
import EpisodePlayer from '../components/EpisodePlayer';
import SidebarDetails from '../components/SidebarDetails';
import SidebarGenres from '../components/SidebarGenres';

export function AnimePage() {
    const [selectedVersion, setSelectedVersion] = useState<'sub' | 'dub'>('sub');
    const [currentEpisode, setCurrentEpisode] = useState(1);
    const [selectedRange, setSelectedRange] = useState<number[]>([1, 20]);
    const [videoSrc, setVideoSrc] = useState<string | null>(null);
    const { id } = useParams();
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    const { data: episodesData, isLoading: episodesLoading } = useQuery(
        ['episodes', id],
        () => fetch(`${API_BASE_URL}/episode/${id}`).then((res) => res.json())
    );

    const { data: animeInfoData, isLoading: infoLoading } = useQuery(
        ['animeInfo', id],
        () => fetch(`${API_BASE_URL}/anime/info/${id}`).then((res) => res.json())
    );

    useEffect(() => {
        if (!episodesLoading && episodesData?.data?.episodes) {
            const firstEpisode = episodesData.data.episodes[0];
            setCurrentEpisode(firstEpisode.number);
            playVideo(firstEpisode.episodeId);
        }
    }, [episodesLoading, episodesData]);

    useEffect(() => {
        if (!episodesData || episodesLoading) return;
        playVideoForCurrentEpisode();
    }, [currentEpisode, selectedVersion, episodesData]);

    const playVideoForCurrentEpisode = async () => {
        if (!episodesData || !selectedVersion) return;

        const episode = episodesData.data.episodes.find((ep: any) => ep.number === currentEpisode);
        if (episode) {
            await playVideo(episode.episodeId);
        }
    };

    const handleRangeChange = (range: string) => {
        const [start, end] = range.split('-').map(Number);
        setSelectedRange([start, end]);
        setCurrentEpisode(start);  // Optionally reset the current episode when the range changes
    };

    const playVideo = async (episodeId: string) => {
        try {
            const cleanEpisodeId = episodeId.split('?')[0];
            const episodeNumber = episodeId.split('?')[1];

            const response = await fetch(
                `${API_BASE_URL}/episode/sources/${cleanEpisodeId}/${episodeNumber}/${selectedVersion}`
            );

            if (!response.ok) throw new Error('Failed to fetch video source');
            const data = await response.json();
            const videoUrl = data.data.sources[0]?.url;

            if (videoUrl) {
                setVideoSrc(videoUrl);
            } else {
                console.error('No video URL available for this episode.');
            }
        } catch (error: any) {
            console.error('Error fetching video:', error.message);
        }
    };

    if (episodesLoading || infoLoading) {
        return <div>Loading...</div>;  // Replace with a skeleton loader or other UI
    }

    return (
        <div className="min-h-screen bg-gray-900 pt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="relative">
                    <AnimeVideoPlayer videoSrc={videoSrc} />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <AnimeInfo animeInfo={animeInfoData?.data?.anime?.info} />
                        <EpisodePlayer
                            displayedEpisodes={episodesData?.data?.episodes || []}
                            playVideo={playVideo}
                            currentEpisode={currentEpisode}
                            setCurrentEpisode={setCurrentEpisode}
                            selectedVersion={selectedVersion}
                            setSelectedVersion={setSelectedVersion}
                            selectedRange={selectedRange}
                            handleRangeChange={handleRangeChange}
                        />
                    </div>
                    <div className="space-y-6">
                        <SidebarDetails
                            animeInfo={animeInfoData?.data?.anime?.info}
                            selectedVersion={selectedVersion}
                        />
                        <SidebarGenres genres={animeInfoData?.data?.anime?.moreInfo?.genres} />
                    </div>
                </div>
            </div>
        </div>
    );
}
