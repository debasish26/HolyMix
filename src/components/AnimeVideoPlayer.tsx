import React, { useState, useEffect, useRef } from 'react';
import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/video.css';
import { MediaPlayer, MediaProvider, Gesture, Track, Captions, CaptionButton, SeekButton } from '@vidstack/react';
import { ClosedCaptionsIcon, ClosedCaptionsOnIcon, SeekForward10Icon } from '@vidstack/react/icons';
import { defaultLayoutIcons, DefaultVideoLayout } from '@vidstack/react/player/layouts/default';


const AnimeVideoPlayer = ({ videoSrc, tracks, introStart, introEnd, animeId, animeTitle, animeImage }: {
    videoSrc: string | null;
    tracks: any;
    introStart: any;
    introEnd: any;
    animeId: string;
    animeTitle: string;
    animeImage: string;
}) => {

    const lastUpdateRef = useRef<number>(Date.now());
    const watchTimeAccumulatorRef = useRef<number>(0);

    const updateWatchTime = async () => {
        const userId = localStorage.getItem('userId');
        if (!userId) return;

        const now = Date.now();
        const timeDiff = (now - lastUpdateRef.current) / 1000; // Convert to seconds
        watchTimeAccumulatorRef.current += timeDiff;

        // Update database every 30 seconds
        if (watchTimeAccumulatorRef.current >= 30) {
            try {
                const response = await fetch('https://holymix-login-backend.onrender.com/update-watch-time', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        userId,
                        timeInSeconds: Math.floor(watchTimeAccumulatorRef.current)
                    })
                });

                if (response.ok) {
                    watchTimeAccumulatorRef.current = 0; // Reset accumulator
                }
            } catch (error) {
                console.error('Error updating watch time:', error);
            }
        }

        lastUpdateRef.current = now;
    };

    useEffect(() => {
        const interval = setInterval(updateWatchTime, 5000); // Check every 5 seconds
        return () => {
            clearInterval(interval);
            // Final update when component unmounts
            updateWatchTime();
        };
    }, []);
    return (
        <MediaPlayer
            src={videoSrc || "https://files.vidstack.io/sprite-fight/hls/stream.m3u8"}

            className="relative bg-black w-full max-w-screen h-[26vh] sm:h-[50vh] md:h-[60vh] lg:h-[70vh]"
            playsInline
            autoplay
            onPlay={() => lastUpdateRef.current = Date.now()} // Reset timer when video starts
            onPause={updateWatchTime} // Update when video pauses

        >

            <MediaProvider>
                <DefaultVideoLayout thumbnails={tracks} icons={defaultLayoutIcons} />

                <Gesture className="vds-gesture" event="pointerup" action="toggle:paused" />
                <Gesture className="vds-gesture" event="pointerup" action="toggle:controls" />
                <Gesture className="vds-gesture" event="dblpointerup" action="seek:-10" />
                <Gesture className="vds-gesture" event="dblpointerup" action="seek:10" />
                <Gesture className="vds-gesture" event="dblpointerup" action="toggle:fullscreen" />

                <CaptionButton className="vds-button">
                    <ClosedCaptionsOnIcon className="cc-on-icon vds-icon" />
                    <ClosedCaptionsIcon className="cc-off-icon vds-icon" />
                </CaptionButton>
                {tracks && (
                    <Track
                        src={tracks}
                        kind="subtitles"
                        label="English"
                        lang="en-US"
                        default
                    />
                )}
            </MediaProvider>
        </MediaPlayer>
    );
};

export default AnimeVideoPlayer;
