import React, { useState, useRef, useEffect } from 'react';
import {
    Play,
    Pause,
    Volume2,
    VolumeX,
    SkipForward,
    SkipBack,
    Subtitles,
    Settings,
    Maximize,
    X,
    Signal,
    ArrowBigLeftDash,
    ArrowBigRightDash,
    Loader2
} from 'lucide-react';

import Hls from 'hls.js';

const AnimeVideoPlayer = ({ videoSrc }: {
    videoSrc: string | null;
}) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const hlsRef = useRef<Hls | null>(null);
    const progressBarRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [playbackSpeed, setPlaybackSpeed] = useState(0);
    const [showCaptions, setShowCaptions] = useState(false);
    const [showVolumeSlider, setShowVolumeSlider] = useState(false);
    const [quality, setQuality] = useState('720p');
    const [showQualitySettings, setShowQualitySettings] = useState(true);

    const [lastTapTime, setLastTapTime] = useState(0);
    const [touchStartX, setTouchStartX] = useState(0);
    const [autoplay, setAutoplay] = useState(true);
    const [availableQualities, setAvailableQualities] = useState<number[]>([]);
    const [currentQuality, setCurrentQuality] = useState<number>(-1); // -1 for auto
    const [isControlsVisible, setIsControlsVisible] = useState(true); // New state for controls visibility
    const [isLoading, setIsLoading] = useState(false); // New state for loading spinner





    useEffect(() => {
        const handleLoadedMetadata = () => {
            if (videoRef.current) {
                setDuration(videoRef.current.duration);
            }
        };

        if (videoRef.current) {
            videoRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);
        }

        const handleKeyPress = (e: KeyboardEvent) => {
            switch (e.key) {
                case 'Escape':
                    if (document.fullscreenElement) {
                        document.exitFullscreen();
                    }
                    break;
                case 'ArrowRight':
                    skip(10);
                    break;
                case 'ArrowLeft':
                    skip(-10);
                    break;
                case ' ':
                    e.preventDefault();
                    togglePlay();
                    break;
            }
        };
        document.addEventListener('keydown', handleKeyPress);
        return () => {
            document.removeEventListener('keydown', handleKeyPress);
            if (videoRef.current) {
                videoRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata);
            }
        };
    }, []);

    useEffect(() => {
        if (videoSrc && videoRef.current) {
            if (Hls.isSupported()) {
                const hls = new Hls();
                hlsRef.current = hls;

                hls.loadSource(videoSrc);
                hls.attachMedia(videoRef.current);

                hls.on(Hls.Events.MANIFEST_PARSED, (_, data) => {
                    const qualityLevels = hls.levels.map((level) => level.height);
                    setAvailableQualities(qualityLevels);
                    setCurrentQuality(-1); // Default to auto
                    setDuration(videoRef.current.duration);
                });

                hls.on(Hls.Events.ERROR, (_, data) => {
                    console.error('HLS.js error:', data);
                });

                return () => {
                    hls.destroy();
                    hlsRef.current = null;
                };
            } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
                videoRef.current.src = videoSrc;
                videoRef.current.load();
            } else {
                console.error('HLS is not supported on this browser.');
            }
        }
    }, [videoSrc]);

    let inactivityTimer: NodeJS.Timeout | null = null;

    const resetInactivityTimer = () => {
        if (inactivityTimer) clearTimeout(inactivityTimer);

        // Show controls when mouse moves
        setIsControlsVisible(true);

        // Hide controls after 5 seconds of inactivity
        inactivityTimer = setTimeout(() => {
            if (document.fullscreenElement) {
                setIsControlsVisible(false);
            }
        }, 5000);
    };

    useEffect(() => {
        const handleMouseMove = () => {
            resetInactivityTimer();
        };

        // Attach mouse move listener when entering fullscreen
        const handleFullscreenChange = () => {
            if (document.fullscreenElement) {
                resetInactivityTimer(); // Start timer on fullscreen
                document.addEventListener('mousemove', handleMouseMove);
            } else {
                setIsControlsVisible(true); // Always show controls when exiting fullscreen
                if (inactivityTimer) clearTimeout(inactivityTimer);
                document.removeEventListener('mousemove', handleMouseMove);
            }
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => {
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
            document.removeEventListener('mousemove', handleMouseMove);
            if (inactivityTimer) clearTimeout(inactivityTimer);
        };
    }, []);
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.autoplay = autoplay;

            // Update play state when video starts playing
            const handlePlay = () => setIsPlaying(true);
            const handlePause = () => setIsPlaying(false);

            videoRef.current.addEventListener("play", handlePlay);
            videoRef.current.addEventListener("pause", handlePause);

            return () => {
                videoRef.current?.removeEventListener("play", handlePlay);
                videoRef.current?.removeEventListener("pause", handlePause);
            };
        }
    }, [autoplay]);


    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchStartX(e.touches[0].clientX);
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        const touchEndX = e.changedTouches[0].clientX;
        const screenWidth = window.innerWidth;
        const currentTime = Date.now();
        const tapDuration = currentTime - lastTapTime;

        if (tapDuration < 300) {
            if (touchEndX < screenWidth / 2) {
                skip(-10);
            } else {
                skip(10);
            }
        }

        setLastTapTime(currentTime);
    };

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };
    const handleTimeUpdate = () => {
        if (videoRef.current) {
            const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
            setProgress(progress);
            setCurrentTime(videoRef.current.currentTime);
        }
    };

    const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (progressBarRef.current && videoRef.current) {
            const rect = progressBarRef.current.getBoundingClientRect();
            const pos = (e.clientX - rect.left) / rect.width;
            videoRef.current.currentTime = pos * videoRef.current.duration;
        }
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        if (videoRef.current) {
            videoRef.current.volume = newVolume;
            setIsMuted(newVolume === 0);
        }
    };

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
            setVolume(isMuted ? 1 : 0);
        }
    };

    const skip = (seconds: number) => {
        if (videoRef.current) {
            videoRef.current.currentTime += seconds;
        }
    };

    const toggleFullScreen = () => {
        if (containerRef.current) {
            if (document.fullscreenElement) {
                document.exitFullscreen();
            } else {
                containerRef.current.requestFullscreen();
            }
        }
    };

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const handleSpeedChange = (speed: number) => {
        if (videoRef.current) {
            videoRef.current.playbackRate = speed;
            setPlaybackSpeed(speed);
            setShowSettings(false);
        }
    };


    const handleQualityChange = (qualityIndex: number) => {
        if (!hlsRef.current) return;

        if (qualityIndex === -1) {
            // Auto quality
            hlsRef.current.currentLevel = -1;
        } else {
            hlsRef.current.currentLevel = qualityIndex;
        }

        setCurrentQuality(qualityIndex);
        setQuality(qualityIndex === -1 ? 'Auto' : `${hlsRef.current.levels[qualityIndex].height}p`);
    };
    useEffect(() => {
        const handleLoadedMetadata = () => {
            if (videoRef.current) {
                setDuration(videoRef.current.duration);
            }
        };

        const handleWaiting = () => setIsLoading(true); // Show spinner when video is waiting
        const handleCanPlay = () => setIsLoading(false); // Hide spinner when video can play
        const handlePlaying = () => setIsLoading(false); // Hide spinner when video starts playing

        if (videoRef.current) {
            videoRef.current.addEventListener("loadedmetadata", handleLoadedMetadata);
            videoRef.current.addEventListener("waiting", handleWaiting);
            videoRef.current.addEventListener("canplay", handleCanPlay);
            videoRef.current.addEventListener("playing", handlePlaying);
        }

        return () => {
            if (videoRef.current) {
                videoRef.current.removeEventListener("loadedmetadata", handleLoadedMetadata);
                videoRef.current.removeEventListener("waiting", handleWaiting);
                videoRef.current.removeEventListener("canplay", handleCanPlay);
                videoRef.current.removeEventListener("playing", handlePlaying);
            }
        };
    }, []);


    return (
        <div
            ref={containerRef}
            className="video-container relative bg-black w-full max-w-screen h-[30vh] sm:h-[50vh] md:h-[60vh] lg:h-[70vh]"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            {isLoading && ( // Conditionally render the spinner
                <div className="absolute inset-0 flex items-center justify-center bg-black/75 z-10">
                    <Loader2 className="text-white animate-spin" size={48} />
                </div>
            )}
            <video
                ref={videoRef}
                className="w-full h-full object-contain"
                onTimeUpdate={handleTimeUpdate}
                onClick={togglePlay}
                preload="metadata"
            >
                <source src={videoSrc} type="video/mp4" />
                <track
                    kind="subtitles"
                    src="https://raw.githubusercontent.com/mozilla/pdf.js/master/test/pdfs/big-buck-bunny.webm.vtt"
                    srcLang="en"
                    label="English"
                    default={showCaptions}
                />
            </video>
            {showCaptions && (
                <div className="absolute bottom-24 left-1/2 -translate-x-1/2 text-white text-lg bg-black/75 px-4 py-2 text-center max-w-[80%] ">
                    [Big Buck Bunny bounces through the forest]
                </div>
            )}

            {isControlsVisible && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent px-4 pb-4">

                    <div
                        ref={progressBarRef}
                        className="relative h-1 w-full bg-white/30 cursor-pointer mb-4"
                        onClick={handleProgressBarClick}
                    >
                        <div
                            className="absolute top-0 left-0 h-full bg-white"
                            style={{ width: `${progress}%` }}
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <button onClick={togglePlay} className="text-white hover:text-gray-300">
                                {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                            </button>

                            <div className="relative">
                                <button
                                    onClick={toggleMute}
                                    onMouseEnter={() => setShowVolumeSlider(true)}
                                    onMouseLeave={() => setShowVolumeSlider(false)}
                                    className="text-white hover:text-gray-300"
                                >
                                    {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
                                </button>

                                {showVolumeSlider && (
                                    <div
                                        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 h-32 p-2"
                                    >
                                        <input
                                            type="range"
                                            min="0"
                                            max="1"
                                            step="0.1"
                                            value={volume}
                                            onChange={handleVolumeChange}
                                            className="h-24 w-1.5 bg-white/30 appearance-none cursor-pointer [-webkit-appearance:slider-vertical]"
                                        />
                                    </div>
                                )}
                            </div>

                            <span className="text-white text-sm">
                                {formatTime(currentTime)} / {formatTime(duration)}
                            </span>
                        </div>

                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-4">
                                <button onClick={() => skip(-10)} className="flex items-center text-white hover:text-gray-300">
                                    <ArrowBigLeftDash size={24} className="mr-1" />
                                    <span>10</span>
                                </button>
                                <button onClick={() => skip(10)} className="flex items-center text-white hover:text-gray-300">
                                    <span>10</span>
                                    <ArrowBigRightDash size={24} className="ml-1" />
                                </button>
                                <button
                                    onClick={() => setShowCaptions(!showCaptions)}
                                    className={`text-white hover:text-gray-300 ${showCaptions ? 'bg-red-500/30' : ''}`}
                                >
                                    <Subtitles size={24} />
                                </button>

                            </div>

                            <div className="relative">
                                <button
                                    onClick={() => {
                                        setShowSettings(!showSettings);
                                        setShowQualitySettings(false);
                                    }}
                                    className="text-white hover:text-gray-300"
                                >
                                    <Settings size={24} />
                                </button>

                                {showSettings && (
                                    <div className="absolute bottom-full right-0 mb-6 w-64 bg-[#111827]/90 ">
                                        <div className="py-3 px-4 space-y-4">
                                            {/* Autoplay Toggle */}
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-2">

                                                    <span className="text-white text-sm">Autoplay</span>
                                                </div>
                                                <button
                                                    onClick={() => setAutoplay(!autoplay)}
                                                    className={`w-8 h-4 rounded-full relative ${autoplay ? 'bg-red-500' : 'bg-gray-600'
                                                        }`}
                                                >
                                                    <div
                                                        className={`absolute top-0.5 h-3 w-3 rounded-full bg-white transition-transform ${autoplay ? 'translate-x-4' : 'translate-x-0.5'
                                                            }`}
                                                    />
                                                </button>
                                            </div>
                                            <div>
                                                <div className="flex items-center justify-between mb-2">
                                                    <div className="flex items-center space-x-2">
                                                        <Signal size={16} className="text-white" />
                                                        <span className="text-white text-sm">Quality</span>
                                                    </div>
                                                    <button
                                                        onClick={() => setShowQualitySettings(false)}
                                                        className="text-white hover:text-gray-300"
                                                    >

                                                    </button>
                                                </div>
                                                {availableQualities.length > 0 && (
                                                    <div>
                                                        {availableQualities.map((quality, index) => (
                                                            <button
                                                                key={index}
                                                                onClick={() => handleQualityChange(index)}
                                                                className={`block w-full text-left px-3 py-1.5 text-sm rounded ${currentQuality === index ? 'bg-red-500 text-white' : 'text-white hover:bg-white/10'
                                                                    }`}
                                                            >
                                                                {quality}p
                                                            </button>
                                                        ))}
                                                        <button
                                                            onClick={() => handleQualityChange(-1)}
                                                            className={`block w-full text-left px-3 py-1.5 text-sm rounded ${currentQuality === -1 ? 'bg-red-500 text-white' : 'text-white hover:bg-white/10'
                                                                }`}
                                                        >
                                                            Auto
                                                        </button>
                                                    </div>
                                                )}


                                            </div>


                                        </div>
                                    </div>
                                )}


                            </div>

                            <button onClick={toggleFullScreen} className="text-white hover:text-gray-300">
                                <Maximize size={24} />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>

    );
};

export default AnimeVideoPlayer;
