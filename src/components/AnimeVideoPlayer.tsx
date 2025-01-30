import React, { useState, useEffect } from 'react';
import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/video.css';
import { MediaPlayer, MediaProvider, Gesture, Track, Captions, CaptionButton, SeekButton } from '@vidstack/react';
import { ClosedCaptionsIcon, ClosedCaptionsOnIcon, SeekForward10Icon } from '@vidstack/react/icons';
import { defaultLayoutIcons, DefaultVideoLayout } from '@vidstack/react/player/layouts/default';
const AnimeVideoPlayer = ({ videoSrc, tracks, introStart, introEnd, }: {
    videoSrc: string | null;
    tracks: any;
    introStart: any;
    introEnd: any;

}) => {


    return (
        <MediaPlayer
            src={videoSrc || "https://files.vidstack.io/sprite-fight/hls/stream.m3u8"}

            className="relative bg-black w-full max-w-screen h-[26vh] sm:h-[50vh] md:h-[60vh] lg:h-[70vh]"
            playsInline
            autoplay

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
                <Track
                    src={tracks}
                    kind="subtitles"
                    label="English"
                    lang="en-US"
                    default
                />
            </MediaProvider>
        </MediaPlayer>
    );
};

export default AnimeVideoPlayer;
