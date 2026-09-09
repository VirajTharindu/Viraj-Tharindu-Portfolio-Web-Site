"use client";

import { useRef, useState, useEffect } from "react";
import { Play, Sparkles, Maximize2, Video } from "lucide-react";
import { Project } from "@/data/projects";

interface ProjectVideoPreviewProps {
    project: Project;
    onOpenModal: (project: Project) => void;
}

const resolveImgSrc = (src: string) => {
    if (!src) return "";
    if (src.startsWith("http")) return src;
    const clean = src.replace(/^\/?(docs\/|screenshots\/)/, "");
    return `/docs/${clean}`;
};

export default function ProjectVideoPreview({
    project,
    onOpenModal,
}: ProjectVideoPreviewProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const [progress, setProgress] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);

    // Play on hover, pause on leave
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        if (isHovered) {
            video.currentTime = 0;
            video
                .play()
                .then(() => setIsLoaded(true))
                .catch(() => {
                    // Fallback to muted playback
                    video.muted = true;
                    video.play().catch(() => {});
                });
        } else {
            video.pause();
            setProgress(0);
        }
    }, [isHovered]);

    const handleTimeUpdate = () => {
        if (!videoRef.current || !videoRef.current.duration) return;
        const currentProgress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
        setProgress(currentProgress);
    };

    const posterImage = resolveImgSrc(
        project.screenshots && project.screenshots.length > 0
            ? project.screenshots[0]
            : project.image
    );

    return (
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => onOpenModal(project)}
            className="group/preview relative w-full h-[280px] sm:h-[380px] md:h-[460px] bg-surface overflow-hidden cursor-pointer select-none"
        >
            {/* Poster image (displayed underneath, always fallback/static base) */}
            <img
                src={posterImage}
                alt={`${project.title} Preview`}
                className={`absolute inset-0 w-full h-full object-cover object-left-top transition-all duration-700 ease-out ${
                    isHovered ? "scale-105 opacity-0" : "scale-100 opacity-100"
                }`}
            />

            {/* Video element (cross-fades in on hover) */}
            <video
                ref={videoRef}
                src={project.videoUrl}
                poster={posterImage}
                muted
                loop
                playsInline
                preload="metadata"
                onTimeUpdate={handleTimeUpdate}
                className={`absolute inset-0 w-full h-full object-cover object-left-top transition-opacity duration-500 ease-out ${
                    isHovered ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                }`}
            />

            {/* Top ambient dark gradient for badge readability */}
            <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/70 via-black/30 to-transparent pointer-events-none" />

            {/* Bottom ambient gradient */}
            <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />

            {/* Top Status & Type Badges */}
            <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
                <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-surface/85 backdrop-blur-md px-3 py-1 text-[11px] font-semibold text-foreground/90 border border-border shadow-md">
                        <Video size={12} className="text-primary" />
                        <span>Interactive Walkthrough</span>
                    </span>
                </div>

                {/* Pulsing Live indicator on hover */}
                {isHovered ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 backdrop-blur-md border border-emerald-500/40 px-2.5 py-0.5 text-[11px] font-mono font-medium text-emerald-400 animate-pulse shadow-lg">
                        <span className="h-2 w-2 rounded-full bg-emerald-400" />
                        <span>PREVIEWING</span>
                    </span>
                ) : (
                    <span className="inline-flex items-center gap-1 rounded-full bg-primary/20 backdrop-blur-md border border-primary/30 px-2.5 py-0.5 text-[11px] font-medium text-primary-light">
                        <Sparkles size={11} />
                        <span>Hover to Preview</span>
                    </span>
                )}
            </div>

            {/* Resting Center Frosted Play Badge (When not hovered) */}
            <div
                className={`absolute inset-0 flex items-center justify-center transition-all duration-300 pointer-events-none ${
                    isHovered ? "opacity-0 scale-90" : "opacity-100 scale-100"
                }`}
            >
                <div className="flex items-center gap-2.5 rounded-full bg-surface/85 backdrop-blur-xl px-5 py-2.5 border border-white/15 shadow-2xl shadow-black/60 group-hover/preview:border-primary/50 group-hover/preview:scale-105 transition-transform duration-300">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white shadow-md shadow-primary/40">
                        <Play size={16} className="ml-0.5 fill-white" />
                    </div>
                    <div className="text-left">
                        <div className="text-xs font-bold text-white tracking-wide">Watch Full Walkthrough</div>
                        <div className="text-[10px] text-muted font-mono">Hover to preview · Click to play</div>
                    </div>
                </div>
            </div>

            {/* Floating Expand CTA Button on Hover */}
            <div
                className={`absolute inset-0 flex items-center justify-center transition-all duration-300 pointer-events-none ${
                    isHovered ? "opacity-100 scale-100" : "opacity-0 scale-95"
                }`}
            >
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/95 backdrop-blur-md px-6 py-3 text-xs font-bold text-white shadow-2xl shadow-primary/60 ring-2 ring-primary/50 ring-offset-2 ring-offset-black/50 transition-all duration-200 transform group-hover/preview:scale-105">
                    <Maximize2 size={14} />
                    <span>Click to Open Cinema Player & Controls</span>
                </div>
            </div>

            {/* Micro Hover Progress Bar at the bottom edge */}
            <div className="absolute inset-x-0 bottom-0 h-1.5 bg-black/40 backdrop-blur-sm z-10">
                <div
                    style={{ width: `${progress}%` }}
                    className="h-full bg-gradient-to-r from-primary via-primary-light to-accent transition-all duration-100 shadow-[0_0_8px_rgba(99,102,241,0.8)]"
                />
            </div>
        </div>
    );
}
