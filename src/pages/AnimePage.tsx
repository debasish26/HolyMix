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
    const [isLoading, setIsLoading] = useState(false);  // State for loading bar
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
            playVideo(firstEpisode.episodeId, selectedVersion);
        }
    }, [episodesLoading, episodesData]);

    useEffect(() => {
        if (!episodesData || episodesLoading) return;
        playVideoForCurrentEpisode(selectedVersion);
    }, [currentEpisode, selectedVersion, episodesData]);

    const playVideoForCurrentEpisode = async (version: 'sub' | 'dub') => {
        if (!episodesData) return;

        const episode = episodesData.data.episodes.find((ep: any) => ep.number === currentEpisode);
        if (episode) {
            await playVideo(episode.episodeId, version);
        }
    };

    const handleRangeChange = (range: string) => {
        const [start, end] = range.split('-').map(Number);
        setSelectedRange([start, end]);
        setCurrentEpisode(start);
    };

    const playVideo = async (episodeId: string, version: 'sub' | 'dub') => {
        try {
            setIsLoading(true); // Show loading bar
            const cleanEpisodeId = episodeId.split('?')[0];
            const episodeNumber = episodeId.split('?')[1];

            const response = await fetch(
                `${API_BASE_URL}/episode/sources/${cleanEpisodeId}/${episodeNumber}/${version}`
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
        } finally {
            setIsLoading(false); // Hide loading bar
        }
    };

    const handleVersionChange = async (newVersion: 'sub' | 'dub') => {
        if (newVersion === selectedVersion) return;

        const episode = episodesData?.data?.episodes.find((ep: any) => ep.number === currentEpisode);
        if (!episode) return;

        try {
            setIsLoading(true); // Show loading bar
            const cleanEpisodeId = episode.episodeId.split('?')[0];
            const episodeNumber = episode.episodeId.split('?')[1];

            const response = await fetch(
                `${API_BASE_URL}/episode/sources/${cleanEpisodeId}/${episodeNumber}/${newVersion}`
            );

            if (response.ok) {
                const data = await response.json();
                const videoUrl = data.data.sources[0]?.url;

                if (videoUrl) {
                    setSelectedVersion(newVersion);
                    setVideoSrc(videoUrl);
                } else {
                    console.warn(`Dub version not available for Episode ${currentEpisode}`);
                    alert(`Dub version not available for Episode ${currentEpisode}`);
                }
            } else {
                console.warn(`Dub version not available for Episode ${currentEpisode}`);
                alert(`Dub version not available for Episode ${currentEpisode}`);
            }
        } catch (error: any) {
            console.error('Error checking version availability:', error.message);
        } finally {
            setIsLoading(false); // Hide loading bar
        }
    };

    useEffect(() => {
        if (isLoading) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isLoading]);


    if (episodesLoading || infoLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className={`min-h-screen bg-gray-900 pt-16 ${isLoading ? 'pointer-events-none opacity-50' : ''}`}>
            {/* Loading Bar - Moves Left to Right */}
            {isLoading && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100vh',
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 1000,
                    }}
                >
                    <div style={{ width: '100%', height: '4px', position: 'absolute', top: 0 }}>
                        <div
                            style={{
                                width: '100%',
                                height: '100%',
                                background:
                                    'linear-gradient(to right, red, transparent)',
                                animation: 'loadingBar 1.5s infinite linear',
                            }}
                        ></div>
                </div>
                <span style={{ color: 'white', fontSize: '20px' }}>Loading...</span>
                </div>

            )}

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
                            setSelectedVersion={handleVersionChange}
                            selectedRange={selectedRange}
                            handleRangeChange={handleRangeChange}
                            animeInfoData={animeInfoData}
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
            {/* Loading Bar Animation */}
            <style>
                {`
                @keyframes loadingBar {
                    0% {
                        transform: translateX(-100%);
                    }
                    100% {
                        transform: translateX(100%);
                    }
                }
                `}
            </style>
        </div>
    );
}
