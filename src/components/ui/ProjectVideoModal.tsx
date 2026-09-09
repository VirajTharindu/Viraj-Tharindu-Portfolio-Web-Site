"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    X,
    Play,
    Pause,
    Volume2,
    Volume1,
    VolumeX,
    Maximize,
    Minimize,
    RotateCcw,
    RotateCw,
    Sparkles,
    Shield,
    Cpu,
    Github,
    PictureInPicture,
    ExternalLink,
} from "lucide-react";
import { Project } from "@/data/projects";

interface ProjectVideoModalProps {
    project: Project | null;
    isOpen: boolean;
    onClose: () => void;
}

const formatTime = (timeInSeconds: number) => {
    if (isNaN(timeInSeconds) || timeInSeconds < 0) return "00:00";
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};

export default function ProjectVideoModal({
    project,
    isOpen,
    onClose,
}: ProjectVideoModalProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);
    const hideControlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const [isPlaying, setIsPlaying] = useState(true);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [buffered, setBuffered] = useState(0);
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);
    const [playbackRate, setPlaybackRate] = useState(1);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showControls, setShowControls] = useState(true);
    const [isBuffering, setIsBuffering] = useState(false);
    const [showRipple, setShowRipple] = useState<"play" | "pause" | null>(null);
    const [hoverTime, setHoverTime] = useState<number | null>(null);
    const [hoverPosition, setHoverPosition] = useState<number | null>(null);
    const [speedMenuOpen, setSpeedMenuOpen] = useState(false);

    // Reset and autoplay when modal opens with a project
    useEffect(() => {
        if (isOpen && project?.videoUrl) {
            setIsPlaying(true);
            setCurrentTime(0);
            setPlaybackRate(1);
            setIsBuffering(true);
            setShowControls(true);

            // Trigger autoplay once DOM attaches
            setTimeout(() => {
                if (videoRef.current) {
                    videoRef.current.currentTime = 0;
                    videoRef.current
                        .play()
                        .then(() => {
                            setIsPlaying(true);
                            setIsBuffering(false);
                        })
                        .catch(() => {
                            // If autoplay with sound is blocked, fallback to muted play
                            if (videoRef.current) {
                                videoRef.current.muted = true;
                                setIsMuted(true);
                                videoRef.current.play().then(() => setIsPlaying(true));
                            }
                        });
                }
            }, 150);
        } else {
            if (videoRef.current) {
                videoRef.current.pause();
            }
        }
    }, [isOpen, project]);

    // Handle mouse movement to auto-hide controls
    const handleMouseMove = useCallback(() => {
        setShowControls(true);
        if (hideControlsTimeoutRef.current) {
            clearTimeout(hideControlsTimeoutRef.current);
        }
        if (isPlaying) {
            hideControlsTimeoutRef.current = setTimeout(() => {
                setShowControls(false);
                setSpeedMenuOpen(false);
            }, 2800);
        }
    }, [isPlaying]);

    // Play / Pause Toggle
    const togglePlay = useCallback(() => {
        if (!videoRef.current) return;
        if (videoRef.current.paused) {
            videoRef.current.play();
            setIsPlaying(true);
            setShowRipple("play");
        } else {
            videoRef.current.pause();
            setIsPlaying(false);
            setShowRipple("pause");
        }
        setTimeout(() => setShowRipple(null), 500);
    }, []);

    // Seek +/- seconds
    const seekRelative = useCallback((seconds: number) => {
        if (!videoRef.current) return;
        const newTime = Math.min(Math.max(videoRef.current.currentTime + seconds, 0), duration);
        videoRef.current.currentTime = newTime;
        setCurrentTime(newTime);
    }, [duration]);

    // Mute Toggle
    const toggleMute = useCallback(() => {
        if (!videoRef.current) return;
        const nextMute = !isMuted;
        videoRef.current.muted = nextMute;
        setIsMuted(nextMute);
        if (!nextMute && volume === 0) {
            setVolume(0.8);
            videoRef.current.volume = 0.8;
        }
    }, [isMuted, volume]);

    // Fullscreen Toggle
    const toggleFullscreen = useCallback(() => {
        if (!containerRef.current) return;
        if (!document.fullscreenElement) {
            containerRef.current.requestFullscreen().catch(() => {});
        } else {
            document.exitFullscreen().catch(() => {});
        }
    }, []);

    // PiP Toggle
    const togglePiP = useCallback(async () => {
        if (!videoRef.current) return;
        try {
            if (document.pictureInPictureElement) {
                await document.exitPictureInPicture();
            } else if (document.pictureInPictureEnabled) {
                await videoRef.current.requestPictureInPicture();
            }
        } catch (e) {
            console.error("PiP error", e);
        }
    }, []);

    // Fullscreen listener
    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };
        document.addEventListener("fullscreenchange", handleFullscreenChange);
        return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
    }, []);

    // Keyboard Shortcuts
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            // Ignore if active in input/textarea
            if (["INPUT", "TEXTAREA"].includes((e.target as HTMLElement)?.tagName)) return;

            switch (e.key.toLowerCase()) {
                case " ":
                case "k":
                    e.preventDefault();
                    togglePlay();
                    break;
                case "f":
                    e.preventDefault();
                    toggleFullscreen();
                    break;
                case "m":
                    e.preventDefault();
                    toggleMute();
                    break;
                case "arrowleft":
                case "j":
                    e.preventDefault();
                    seekRelative(-5);
                    break;
                case "arrowright":
                case "l":
                    e.preventDefault();
                    seekRelative(5);
                    break;
                case "escape":
                    if (document.fullscreenElement) {
                        document.exitFullscreen();
                    } else {
                        onClose();
                    }
                    break;
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, togglePlay, toggleFullscreen, toggleMute, seekRelative, onClose]);

    // Track Time & Buffered
    const handleTimeUpdate = () => {
        if (!videoRef.current) return;
        setCurrentTime(videoRef.current.currentTime);
        if (videoRef.current.buffered.length > 0) {
            setBuffered(
                (videoRef.current.buffered.end(videoRef.current.buffered.length - 1) /
                    (videoRef.current.duration || 1)) *
                    100
            );
        }
    };

    // Scrubber click / drag
    const handleScrub = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!progressRef.current || !videoRef.current || !duration) return;
        const rect = progressRef.current.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const ratio = Math.max(0, Math.min(1, clickX / rect.width));
        const targetTime = ratio * duration;
        videoRef.current.currentTime = targetTime;
        setCurrentTime(targetTime);
    };

    // Scrubber hover preview tooltip
    const handleProgressMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!progressRef.current || !duration) return;
        const rect = progressRef.current.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const ratio = Math.max(0, Math.min(1, clickX / rect.width));
        setHoverPosition(clickX);
        setHoverTime(ratio * duration);
    };

    const handleProgressMouseLeave = () => {
        setHoverTime(null);
        setHoverPosition(null);
    };

    // Playback rate selector
    const handleSpeedChange = (speed: number) => {
        if (videoRef.current) {
            videoRef.current.playbackRate = speed;
        }
        setPlaybackRate(speed);
        setSpeedMenuOpen(false);
    };

    if (!isOpen || !project || !project.videoUrl) return null;

    const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 md:p-8">
                {/* Backdrop with dynamic blur and deep tint */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="fixed inset-0 bg-black/85 backdrop-blur-2xl transition-all"
                />

                {/* Main Cinema Modal Container */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.94, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.94, y: 20 }}
                    transition={{ type: "spring", damping: 26, stiffness: 280 }}
                    className="relative z-10 w-full max-w-6xl overflow-hidden rounded-2xl border border-white/10 bg-surface/95 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] ring-1 ring-white/15 flex flex-col max-h-[92vh]"
                >
                    {/* Modal Header Bar */}
                    <div className="flex items-center justify-between border-b border-border/80 bg-surface-light/70 px-4 py-3 sm:px-6">
                        <div className="flex items-center gap-3 truncate">
                            <div className="flex h-3 items-center gap-1.5 shrink-0">
                                <div className="h-3 w-3 rounded-full bg-rose-500 shadow-sm" />
                                <div className="h-3 w-3 rounded-full bg-amber-400 shadow-sm" />
                                <div className="h-3 w-3 rounded-full bg-emerald-500 shadow-sm" />
                            </div>
                            <div className="h-4 w-px bg-border/60 mx-1 hidden sm:block" />
                            <div className="truncate flex items-center gap-2">
                                <span className="font-semibold text-foreground text-sm sm:text-base tracking-tight truncate">
                                    {project.title}
                                </span>
                                {project.videoBadge && (
                                    <span className="hidden md:inline-flex items-center gap-1 rounded-full bg-primary/20 border border-primary/40 px-2.5 py-0.5 text-[11px] font-medium text-primary-light">
                                        <Sparkles size={11} />
                                        {project.videoBadge}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Top Right Quick Actions & Close */}
                        <div className="flex items-center gap-2 shrink-0">
                            {project.liveUrl && (
                                <a
                                    href={project.liveUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hidden sm:flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs text-primary-light hover:text-white bg-primary/20 hover:bg-primary/30 border border-primary/30 transition-colors"
                                    title="Open Live Application"
                                >
                                    <ExternalLink size={14} />
                                    <span>Live App</span>
                                </a>
                            )}
                            {project.githubUrl && (
                                <a
                                    href={project.githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hidden sm:flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs text-muted hover:text-foreground hover:bg-surface transition-colors"
                                    title="View Source Repository"
                                >
                                    <Github size={14} />
                                    <span>Code</span>
                                </a>
                            )}
                            <button
                                onClick={onClose}
                                className="group flex items-center gap-1.5 rounded-lg bg-surface px-2.5 py-1 text-xs font-medium text-muted hover:bg-rose-500/20 hover:text-rose-300 border border-border/60 transition-colors cursor-pointer"
                                aria-label="Close Walkthrough"
                            >
                                <span className="hidden sm:inline text-[11px] opacity-70">Esc</span>
                                <X size={15} className="transition-transform group-hover:rotate-90" />
                            </button>
                        </div>
                    </div>

                    {/* Video Player Theater Stage */}
                    <div
                        ref={containerRef}
                        onMouseMove={handleMouseMove}
                        onMouseLeave={() => {
                            if (isPlaying) setShowControls(false);
                            setSpeedMenuOpen(false);
                        }}
                        className="relative w-full aspect-video bg-black flex items-center justify-center overflow-hidden select-none group/player cursor-pointer"
                        onClick={togglePlay}
                    >
                        {/* Native HTML5 Video Element */}
                        <video
                            ref={videoRef}
                            src={project.videoUrl}
                            poster={project.image || (project.screenshots && project.screenshots[0])}
                            onTimeUpdate={handleTimeUpdate}
                            onLoadedMetadata={() => {
                                if (videoRef.current) {
                                    setDuration(videoRef.current.duration);
                                    setIsBuffering(false);
                                }
                            }}
                            onWaiting={() => setIsBuffering(true)}
                            onPlaying={() => {
                                setIsBuffering(false);
                                setIsPlaying(true);
                            }}
                            onPause={() => setIsPlaying(false)}
                            onEnded={() => {
                                setIsPlaying(false);
                                setShowControls(true);
                            }}
                            playsInline
                            className="w-full h-full object-contain"
                        />

                        {/* Loading / Buffering Spinner */}
                        {isBuffering && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm pointer-events-none">
                                <div className="flex flex-col items-center gap-3">
                                    <div className="h-10 w-10 animate-spin rounded-full border-3 border-primary border-t-transparent shadow-lg" />
                                    <span className="text-xs font-medium text-white/80 tracking-wide">
                                        Buffering High-Res Stream...
                                    </span>
                                </div>
                            </div>
                        )}

                        {/* Center Play/Pause Ripple Notification */}
                        <AnimatePresence>
                            {showRipple && (
                                <motion.div
                                    initial={{ scale: 0.5, opacity: 0 }}
                                    animate={{ scale: 1.1, opacity: 1 }}
                                    exit={{ scale: 1.4, opacity: 0 }}
                                    transition={{ duration: 0.4 }}
                                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                                >
                                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/80 backdrop-blur-md shadow-2xl text-white">
                                        {showRipple === "play" ? (
                                            <Play size={36} className="ml-1 fill-white" />
                                        ) : (
                                            <Pause size={36} className="fill-white" />
                                        )}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Big Center Play Button when Paused & Controls Visible */}
                        {!isPlaying && !isBuffering && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/30 pointer-events-none">
                                <motion.div
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white shadow-2xl shadow-primary/50 ring-4 ring-primary/30"
                                >
                                    <Play size={28} className="ml-1 fill-white" />
                                </motion.div>
                            </div>
                        )}

                        {/* Ambient Gradient Overlays for Controls Visibility */}
                        <div
                            className={`absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/90 via-black/50 to-transparent pointer-events-none transition-opacity duration-300 ${
                                showControls ? "opacity-100" : "opacity-0"
                            }`}
                        />
                        <div
                            className={`absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/60 to-transparent pointer-events-none transition-opacity duration-300 ${
                                showControls ? "opacity-100" : "opacity-0"
                            }`}
                        />

                        {/* Futuristic HUD Video Controls Overlay */}
                        <div
                            onClick={(e) => e.stopPropagation()}
                            className={`absolute inset-x-0 bottom-0 p-3 sm:p-5 transition-opacity duration-300 flex flex-col gap-2.5 z-20 ${
                                showControls ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                            }`}
                        >
                            {/* Interactive Progress Timeline Scrubber */}
                            <div
                                ref={progressRef}
                                onClick={handleScrub}
                                onMouseMove={handleProgressMouseMove}
                                onMouseLeave={handleProgressMouseLeave}
                                className="group/timeline relative h-2.5 w-full cursor-pointer rounded-full bg-white/20 transition-all hover:h-3.5 flex items-center"
                            >
                                {/* Buffer Progress Bar */}
                                <div
                                    style={{ width: `${buffered}%` }}
                                    className="absolute left-0 top-0 h-full rounded-full bg-white/25 transition-all duration-200"
                                />

                                {/* Active Playback Progress Bar */}
                                <div
                                    style={{ width: `${progressPercent}%` }}
                                    className="relative h-full rounded-full bg-gradient-to-r from-primary to-accent shadow-[0_0_12px_rgba(99,102,241,0.8)]"
                                >
                                    {/* Scrubber Thumb */}
                                    <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 h-4 w-4 rounded-full bg-white shadow-md ring-2 ring-primary scale-0 transition-transform group-hover/timeline:scale-100" />
                                </div>

                                {/* Hover Timestamp Tooltip */}
                                {hoverTime !== null && hoverPosition !== null && (
                                    <div
                                        style={{ left: `${hoverPosition}px` }}
                                        className="absolute -top-8 -translate-x-1/2 rounded bg-surface/95 px-2 py-0.5 text-[11px] font-mono text-white shadow-md border border-white/20 pointer-events-none"
                                    >
                                        {formatTime(hoverTime)}
                                    </div>
                                )}
                            </div>

                            {/* Control Buttons & Indicators Row */}
                            <div className="flex items-center justify-between gap-2 text-white">
                                {/* Left Controls: Play/Pause, Skip, Volume, Time */}
                                <div className="flex items-center gap-2 sm:gap-4">
                                    <button
                                        onClick={togglePlay}
                                        className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                                        aria-label={isPlaying ? "Pause" : "Play"}
                                    >
                                        {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
                                    </button>

                                    {/* Skip Back / Forward 10s */}
                                    <button
                                        onClick={() => seekRelative(-10)}
                                        className="hidden sm:flex h-8 w-8 items-center justify-center rounded-lg hover:bg-white/10 text-white/80 hover:text-white transition-colors cursor-pointer"
                                        title="Rewind 10s (J or Left Arrow)"
                                    >
                                        <RotateCcw size={16} />
                                    </button>
                                    <button
                                        onClick={() => seekRelative(10)}
                                        className="hidden sm:flex h-8 w-8 items-center justify-center rounded-lg hover:bg-white/10 text-white/80 hover:text-white transition-colors cursor-pointer"
                                        title="Forward 10s (L or Right Arrow)"
                                    >
                                        <RotateCw size={16} />
                                    </button>

                                    {/* Volume Control */}
                                    <div className="group/vol flex items-center gap-1.5">
                                        <button
                                            onClick={toggleMute}
                                            className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-white/10 text-white/80 hover:text-white transition-colors cursor-pointer"
                                            title="Mute / Unmute (M)"
                                        >
                                            {isMuted || volume === 0 ? (
                                                <VolumeX size={17} className="text-rose-400" />
                                            ) : volume < 0.5 ? (
                                                <Volume1 size={17} />
                                            ) : (
                                                <Volume2 size={17} />
                                            )}
                                        </button>
                                        <input
                                            type="range"
                                            min="0"
                                            max="1"
                                            step="0.05"
                                            value={isMuted ? 0 : volume}
                                            onChange={(e) => {
                                                const val = parseFloat(e.target.value);
                                                setVolume(val);
                                                if (videoRef.current) {
                                                    videoRef.current.volume = val;
                                                    videoRef.current.muted = val === 0;
                                                    setIsMuted(val === 0);
                                                }
                                            }}
                                            className="w-14 sm:w-20 h-1 accent-primary bg-white/30 rounded-lg cursor-pointer transition-opacity"
                                        />
                                    </div>

                                    {/* Time Display */}
                                    <div className="font-mono text-xs text-white/80 tracking-tight">
                                        <span className="text-white font-medium">{formatTime(currentTime)}</span>
                                        <span className="mx-1 text-white/40">/</span>
                                        <span className="text-white/60">{formatTime(duration)}</span>
                                    </div>
                                </div>

                                {/* Right Controls: Speed, PiP, Fullscreen */}
                                <div className="flex items-center gap-1.5 sm:gap-2">
                                    {/* Speed Menu */}
                                    <div className="relative">
                                        <button
                                            onClick={() => setSpeedMenuOpen(!speedMenuOpen)}
                                            className="flex items-center gap-1 rounded-md bg-white/10 hover:bg-white/20 px-2 py-1 text-xs font-mono font-medium text-white transition-colors cursor-pointer"
                                            title="Playback Speed"
                                        >
                                            <span>{playbackRate}x</span>
                                        </button>
                                        {speedMenuOpen && (
                                            <div className="absolute bottom-full right-0 mb-2 w-24 rounded-lg border border-white/15 bg-surface-light/95 p-1 backdrop-blur-md shadow-xl z-30">
                                                {[0.75, 1, 1.25, 1.5, 2].map((s) => (
                                                    <button
                                                        key={s}
                                                        onClick={() => handleSpeedChange(s)}
                                                        className={`w-full rounded px-2 py-1 text-left text-xs font-mono transition-colors cursor-pointer ${
                                                            playbackRate === s
                                                                ? "bg-primary text-white font-bold"
                                                                : "text-foreground/80 hover:bg-white/10"
                                                        }`}
                                                    >
                                                        {s}x
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    {/* PiP Button */}
                                    <button
                                        onClick={togglePiP}
                                        className="hidden sm:flex h-8 w-8 items-center justify-center rounded-lg hover:bg-white/10 text-white/80 hover:text-white transition-colors cursor-pointer"
                                        title="Picture in Picture"
                                    >
                                        <PictureInPicture size={16} />
                                    </button>

                                    {/* Fullscreen Button */}
                                    <button
                                        onClick={toggleFullscreen}
                                        className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-white/10 text-white/80 hover:text-white transition-colors cursor-pointer"
                                        title="Toggle Fullscreen (F)"
                                    >
                                        {isFullscreen ? <Minimize size={17} /> : <Maximize size={17} />}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Feature & Architecture Showcase Drawer */}
                    <div className="border-t border-border bg-surface/90 p-4 sm:p-6 overflow-y-auto max-h-[30vh]">
                        <div className="grid gap-4 md:grid-cols-2">
                            <div>
                                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary-light">
                                    <Cpu size={14} />
                                    <span>System Architecture Highlight</span>
                                </div>
                                <p className="mt-1.5 text-xs sm:text-sm text-foreground/85 leading-relaxed">
                                    {project.architectureHighlight}
                                </p>
                            </div>
                            <div>
                                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent-light">
                                    <Shield size={14} />
                                    <span>Demonstrated Capabilities</span>
                                </div>
                                <div className="mt-2 flex flex-wrap gap-1.5">
                                    {project.features.map((feat) => (
                                        <span
                                            key={feat}
                                            className="inline-flex items-center gap-1 rounded-md bg-surface-light border border-border/70 px-2.5 py-1 text-[11px] text-foreground/90 font-medium"
                                        >
                                            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                                            {feat}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Tech Stack Footer Pills */}
                        <div className="mt-4 pt-3 border-t border-border/50 flex flex-wrap items-center justify-between gap-2">
                            <div className="flex flex-wrap items-center gap-1.5">
                                <span className="text-[11px] text-muted font-mono uppercase mr-1">Stack:</span>
                                {project.techStack.map((tech) => (
                                    <span
                                        key={tech}
                                        className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-medium text-primary-light border border-primary/20"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                            <div className="text-[11px] text-muted font-mono">
                                Press <kbd className="px-1 py-0.5 bg-surface-light rounded border border-border text-foreground font-semibold">Space</kbd> to play/pause · <kbd className="px-1 py-0.5 bg-surface-light rounded border border-border text-foreground font-semibold">F</kbd> for fullscreen
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
