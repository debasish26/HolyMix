import React from 'react';
import {
    MediaPlayer,
    MediaProvider,
    Gesture,
} from '@vidstack/react';
import {
    DefaultAudioLayout,
    defaultLayoutIcons,
    DefaultVideoLayout,
} from '@vidstack/react/player/layouts/default';
import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/video.css';

const AnimeVideoPlayer = ({
    videoSrc,
}: {
    videoSrc: string | null;
}) => {

    // Autoplay Success Handler
    const onAutoPlay = () => {
        console.log("Autoplay started successfully");
    };

    // Autoplay Failure Handler
    const onAutoPlayFail = () => {
        console.log("Autoplay failed");
    };

    return (
        <MediaPlayer

            playsInline
            title="Anime Episode"
            src={videoSrc || "https://cdn.jsdelivr.net/gh/debasish26/holymixm3u8/holymix.m3u8"}
            onAutoPlay={onAutoPlay}
            onAutoPlayFail={onAutoPlayFail}
        >
            <MediaProvider>
                <DefaultAudioLayout icons={defaultLayoutIcons} />
                <DefaultVideoLayout icons={defaultLayoutIcons} />

                <Gesture className="vds-gesture" event="pointerup" action="toggle:paused" />
                <Gesture className="vds-gesture" event="pointerup" action="toggle:controls" />
                <Gesture className="vds-gesture" event="dblpointerup" action="seek:-10" />
                <Gesture className="vds-gesture" event="dblpointerup" action="seek:10" />
                <Gesture className="vds-gesture" event="dblpointerup" action="toggle:fullscreen" />
            </MediaProvider>
        </MediaPlayer>
    );
};

export default AnimeVideoPlayer;
