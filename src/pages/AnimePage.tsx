import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import AnimeVideoPlayer from '../components/AnimeVideoPlayer';
import AnimeInfo from '../components/AnimeInfo';
import EpisodePlayer from '../components/EpisodePlayer';
import SidebarDetails from '../components/SidebarDetails';
import SidebarGenres from '../components/SidebarGenres';


type AnimePageProps = {
    onWatch: (anime: { id: string; title: string; image: string }) => void;
};
export function AnimePage({ onWatch }: AnimePageProps) {
    const [selectedVersion, setSelectedVersion] = useState<'sub' | 'dub'>('sub');
    const [currentEpisode, setCurrentEpisode] = useState(1);
    const [selectedRange, setSelectedRange] = useState<number[]>([1, 20]);
    const [videoSrc, setVideoSrc] = useState<string | null>(null);
    const [epsodeId, setEpisodeId] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [tracks, setTracks] = useState("");
    const [introStart, setIntroStart] = useState("");
    const [introEnd, setIntroEnd] = useState("");
    const [image, setImage] = useState("");
    const [poster, setPoster] = useState(''); // State for poster
    const [title, setTitle] = useState(''); // State for title
    const [rating, setRating] = useState(0.0);
    const [isInWatchlist, setIsInWatchlist] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);


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
        if (!episodesLoading && !infoLoading && episodesData?.data?.episodes && animeInfoData?.data?.anime?.info) {
            const firstEpisode = episodesData.data.episodes[0];
            const animeInfo = animeInfoData.data.anime.info;
            // Store poster and title in state
            setPoster(animeInfo.poster);
            setTitle(animeInfo.name);

            setCurrentEpisode(firstEpisode.number);
            playVideo(
                firstEpisode.episodeId,
                selectedVersion,
                firstEpisode.title,
                firstEpisode.number,
                animeInfoData.data.anime.info.poster
            );
        }
    }, [episodesLoading, infoLoading, episodesData, animeInfoData]);

    useEffect(() => {
        if (!episodesData || episodesLoading) return;
        playVideoForCurrentEpisode(selectedVersion);
    }, [currentEpisode, selectedVersion, episodesData]);


    useEffect(() => {

        // Store anime info in localStorage
        if (animeInfoData?.data?.anime?.info) {
            const animeInfo = animeInfoData.data.anime.info;
            setImage(animeInfo.poster)
            localStorage.setItem(`animeInfo-${id}`, JSON.stringify(animeInfo));
        }
    }, [animeInfoData, id]);

    const playVideoForCurrentEpisode = async (version: 'sub' | 'dub') => {
        if (!episodesData) return;

        const episode = episodesData.data.episodes.find((ep: any) => ep.number === currentEpisode);
        if (episode) {

            await playVideo(episode.episodeId, version, episode.title, episode.number, image);
        }
    };

    const handleRangeChange = (range: string) => {
        const [start, end] = range.split('-').map(Number);
        setSelectedRange([start, end]);
        setCurrentEpisode(start);
    };



    const playVideo = async (episodeId: string, version: 'sub' | 'dub', title: string, number: number, image: string) => {
        try {
            setIsLoading(true);
            setEpisodeId(episodeId);

            const cleanEpisodeId = episodeId.split('?')[0];
            const episodeNumber = episodeId.split('?')[1];

            const animeId = animeInfoData.data.anime.info.id;
            const animeImage = animeInfoData.data.anime.info.poster;


            const response = await fetch(
                `${API_BASE_URL}/episode/sources/${cleanEpisodeId}/${episodeNumber}/${version}`
            );


            if (!response.ok) throw new Error('Failed to fetch video source');
            const data = await response.json();
            const videoUrl = data.data.sources[0]?.url;
            const tracks = data.data.tracks[0]?.file;
            const introStart = data.data.intro?.start;
            const introEnd = data.data.intro?.end;

            if (videoUrl) {
                setVideoSrc(videoUrl);
                setTracks(tracks);
                setIntroStart(introStart);
                setIntroEnd(introEnd);


                await updateWatchHistory(animeId, episodeId, title, animeImage, number);
            } else {
                console.error('No video URL available for this episode.');
            }
        } catch (error: any) {
            console.error('Error fetching video:', error.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (animeInfoData?.data?.anime?.info) {
            const animeInfo = animeInfoData.data.anime.info;

            // Avoid overwriting if already stored
            if (!localStorage.getItem(`animeInfo-${id}`)) {
                localStorage.setItem(`animeInfo-${id}`, JSON.stringify(animeInfo));
            }
        }
    }, [animeInfoData, id]);

    const updateWatchHistory = async (id: string, episodeId: string, title: string, image: string, number: number) => {
        const userId = localStorage.getItem('userId'); // Fetch userId from localStorage

        if (!userId) {
            console.error('User ID not found. Ensure the user is logged in.');
            return;
        }

        try {
            const response = await fetch('https://holymix-login-backend.onrender.com/update-watch-history', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, id, episodeId, title, image, number }),
            });
            console.log(JSON.stringify({ userId, id, episodeId, title, image, number }))



            if (!response.ok) {
                throw new Error('Failed to update watch history');
            }

            const data = await response.json();

        } catch (error) {
            console.error('Error updating watch history:', error);
        }
    };



    const handleVersionChange = async (newVersion: 'sub' | 'dub') => {
        if (newVersion === selectedVersion) return;

        const episode = episodesData?.data?.episodes.find((ep: any) => ep.number === currentEpisode);
        if (!episode) return;

        try {
            setIsLoading(true);
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
            setIsLoading(false);
        }
    };



    if (episodesLoading || infoLoading) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <div className="flex flex-col items-center">
                    <div className="loader"></div>
                    <span className="text-white text-lg mt-4">Loading Anime...</span>
                </div>
                <style>
                    {`
                    .loader {
                        width: 50px;
                        height: 50px;
                        border: 5px solid rgba(255, 255, 255, 0.2);
                        border-top-color: white;
                        border-radius: 50%;
                        animation: spin 1s linear infinite;
                    }
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                    `}
                </style>
            </div>
        );
    }

    return (
        <div className={`min-h-screen bg-gray-900 pt-16 ${isLoading ? 'pointer-events-none opacity-50' : ''}`}>
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-2">
                <div className="relative">
                    <AnimeVideoPlayer videoSrc={videoSrc} tracks={tracks} introStart={introStart} introEnd={introEnd}/>
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
        </div>
    );
}
