"use client";

import { projects, Project } from "@/data/projects";
import { motion, useScroll, useTransform } from "framer-motion";
import { ExternalLink, Github, ArrowRight, Lock, Play, Video } from "lucide-react";
import { useState, useRef } from "react";
import dynamic from "next/dynamic";
import ProjectVideoPreview from "@/components/ui/ProjectVideoPreview";

// Lazy-load the heavy cinema modal — only downloaded when user clicks "Watch Demo"
const ProjectVideoModal = dynamic(() => import("@/components/ui/ProjectVideoModal"), {
    ssr: false,
});

const resolveImgSrc = (src: string) => {
    if (!src) return "";
    if (src.startsWith("http")) return src;
    const clean = src.replace(/^[\/\\]?(docs\/|screenshots\/)/, "");
    return `/docs/${clean}`;
};

// ─── Extracted card component so hooks are called at the top level ───────────
function ProjectCard({
    project,
    i,
    expandedIdx,
    setExpandedIdx,
    activeScreenshots,
    setActiveScreenshots,
    onOpenModal,
}: {
    project: Project;
    i: number;
    expandedIdx: number | null;
    setExpandedIdx: (v: number | null) => void;
    activeScreenshots: Record<number, number>;
    setActiveScreenshots: React.Dispatch<React.SetStateAction<Record<number, number>>>;
    onOpenModal: (p: Project) => void;
}) {
    const isExpanded = expandedIdx === i;
    const cardRef = useRef<HTMLDivElement>(null);

    // useScroll/useTransform are now safely at the top level of this component
    const { scrollYProgress: cardScroll } = useScroll({
        target: cardRef,
        offset: ["start end", "end start"],
    });
    const xShift = useTransform(cardScroll, [0, 1], [i % 2 === 0 ? 50 : -50, i % 2 === 0 ? -50 : 50]);
    const currentImgIdx = activeScreenshots[i] || 0;

    return (
        <motion.div
            ref={cardRef}
            key={project.title}
            style={{ x: xShift }}
            className="glass group overflow-hidden rounded-2xl transition-all duration-300 hover:border-primary/30 mx-auto max-w-[1600px]"
            data-cursor="view"
        >
            <div className="p-6 md:p-8">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2.5">
                            <h3 className="text-xl font-bold">{project.title}</h3>
                            {project.videoUrl && (
                                <span className="inline-flex items-center gap-1 rounded-full bg-primary/15 border border-primary/30 px-2.5 py-0.5 text-[11px] font-semibold text-primary-light">
                                    <Video size={12} />
                                    Video Walkthrough
                                </span>
                            )}
                        </div>
                        <p className="mt-2 text-muted">{project.description}</p>
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                        {project.videoUrl && (
                            <button
                                onClick={() => onOpenModal(project)}
                                className="inline-flex items-center gap-1.5 rounded-lg bg-primary/15 hover:bg-primary/25 border border-primary/30 hover:border-primary/50 px-3 py-1.5 text-xs font-semibold text-primary hover:text-primary-light transition-all duration-200 cursor-pointer shadow-sm group/btn"
                                aria-label={`Watch Walkthrough Video for ${project.title}`}
                            >
                                <Play size={12} className="fill-primary group-hover/btn:scale-110 transition-transform" />
                                <span>Watch Demo</span>
                            </button>
                        )}
                        {project.githubUrl && (
                            <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded-lg p-2 text-muted transition-colors hover:bg-surface-light hover:text-foreground"
                                aria-label={`GitHub for ${project.title}`}
                            >
                                <Github size={18} />
                            </a>
                        )}
                        {project.liveUrl && (
                            <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded-lg p-2 text-muted transition-colors hover:bg-surface-light hover:text-foreground"
                                aria-label={`Live demo for ${project.title}`}
                            >
                                <ExternalLink size={18} />
                            </a>
                        )}
                    </div>
                </div>

                {/* Tech stack pills */}
                <div className="mt-4 flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                        <span
                            key={tech}
                            className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary-light"
                        >
                            {tech}
                        </span>
                    ))}
                </div>

                {/* Showcase in Summary Preview (Video Preview or Screenshot Frame) */}
                <div className="relative mt-6 group/mockup mx-auto max-w-4xl">
                    {/* Multi-layer ambient glow */}
                    <div className="absolute -inset-2 rounded-2xl bg-gradient-to-r from-primary/30 via-primary-light/20 to-accent/30 opacity-0 blur-2xl transition-all duration-700 group-hover/mockup:opacity-100 pointer-events-none" />
                    <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-primary/60 via-primary-light/40 to-accent/60 opacity-0 transition-all duration-500 group-hover/mockup:opacity-30 pointer-events-none rounded-xl" />

                    {/* Modern Browser Mockup Frame */}
                    <div className="relative overflow-hidden rounded-xl border border-border bg-surface shadow-2xl transition-all duration-500 group-hover/mockup:border-primary/50 group-hover/mockup:shadow-primary/20">

                        {/* Browser Chrome Header */}
                        <div className="flex items-center justify-between border-b border-border bg-surface-light/80 px-4 py-2.5">
                            {/* Traffic Lights */}
                            <div className="flex items-center gap-1.5">
                                <div className="h-3 w-3 rounded-full bg-rose-500 shadow-sm" />
                                <div className="h-3 w-3 rounded-full bg-amber-400 shadow-sm" />
                                <div className="h-3 w-3 rounded-full bg-emerald-500 shadow-sm" />
                            </div>

                            {/* Address Bar */}
                            <div className="flex flex-1 mx-4 items-center gap-2 rounded-md bg-background/80 px-3 py-1 text-xs text-muted border border-border font-mono max-w-sm truncate">
                                <Lock size={10} className="shrink-0 text-accent" />
                                <span className="truncate text-foreground/75 text-[11px]">
                                    {project.liveUrl
                                        ? project.liveUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")
                                        : `${project.title.toLowerCase().replace(/[^a-z0-9]/g, "-")}.app`}
                                </span>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center gap-2">
                                {project.liveUrl && (
                                    <a
                                        href={project.liveUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hidden sm:inline-flex items-center gap-1 rounded-md bg-surface-light hover:bg-surface border border-border px-2.5 py-1 text-[11px] font-medium text-muted hover:text-foreground transition-all duration-200"
                                    >
                                        <span>Live</span>
                                        <ExternalLink size={10} />
                                    </a>
                                )}
                                {project.videoUrl ? (
                                    <button
                                        onClick={() => onOpenModal(project)}
                                        className="hidden sm:inline-flex items-center gap-1 rounded-md bg-primary/15 hover:bg-primary/25 border border-primary/30 hover:border-primary/50 px-2.5 py-1 text-[11px] font-medium text-primary hover:text-primary-light transition-all duration-200 cursor-pointer"
                                    >
                                        <Play size={9} className="fill-primary" />
                                        <span>Walkthrough</span>
                                    </button>
                                ) : !project.liveUrl ? (
                                    <div className="flex gap-1">
                                        {[1, 2, 3].map((d) => (
                                            <div key={d} className="h-1 w-1 rounded-full bg-muted/40" />
                                        ))}
                                    </div>
                                ) : null}
                            </div>
                        </div>

                        {/* Viewport: Video Preview on Hover OR Static Screenshots */}
                        {project.videoUrl ? (
                            <ProjectVideoPreview
                                project={project}
                                onOpenModal={(p) => onOpenModal(p)}
                            />
                        ) : (
                            <div className="relative overflow-hidden bg-surface">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={resolveImgSrc(
                                        project.screenshots && project.screenshots.length > 0
                                            ? project.screenshots[currentImgIdx] || project.screenshots[0]
                                            : project.image
                                    )}
                                    alt={`${project.title} Preview`}
                                    loading="lazy"
                                    className="w-full h-auto max-h-[480px] object-cover object-top transition-transform duration-700 ease-out group-hover/mockup:scale-[1.015]"
                                />

                                {/* Subtle inner shadow at top for depth */}
                                <div className="absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-black/10 to-transparent pointer-events-none" />

                                {/* Hover Launch Overlay */}
                                {project.liveUrl && (
                                    <a
                                        href={project.liveUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/mockup:opacity-100 transition-opacity duration-300 bg-background/20"
                                    >
                                        <span className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-xs font-bold text-white shadow-2xl shadow-primary/40 ring-2 ring-primary/40 ring-offset-2 ring-offset-transparent transition-all duration-200 hover:bg-primary-light hover:scale-105">
                                            <ExternalLink size={13} />
                                            Launch Live App
                                        </span>
                                    </a>
                                )}

                                {/* Screenshot dot nav (only if multiple) */}
                                {project.screenshots && project.screenshots.length > 1 && (
                                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 rounded-full bg-surface/90 border border-border px-2 py-1 z-10 shadow-md">
                                        {project.screenshots.map((_, sIdx) => (
                                            <button
                                                key={sIdx}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setActiveScreenshots((prev) => ({ ...prev, [i]: sIdx }));
                                                }}
                                                className={`h-1.5 rounded-full transition-all duration-300 ${currentImgIdx === sIdx
                                                    ? "w-5 bg-primary"
                                                    : "w-1.5 bg-muted/40 hover:bg-muted"
                                                    }`}
                                                aria-label={`View screenshot ${sIdx + 1}`}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Expand toggle */}
                <button
                    onClick={() => setExpandedIdx(isExpanded ? null : i)}
                    className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary-light cursor-pointer"
                >
                    {isExpanded ? "Show less" : "Show details"}
                    <ArrowRight
                        size={14}
                        className={`transition-transform ${isExpanded ? "rotate-90" : ""}`}
                    />
                </button>

                {/* Expanded details */}
                {isExpanded && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 border-t border-border pt-4"
                    >
                        <div className="grid gap-6 md:grid-cols-2">
                            <div>
                                <h4 className="text-sm font-semibold uppercase tracking-wider text-muted">
                                    Problem
                                </h4>
                                <p className="mt-2 text-sm text-foreground/80">{project.problem}</p>
                            </div>
                            <div>
                                <h4 className="text-sm font-semibold uppercase tracking-wider text-muted">
                                    Architecture
                                </h4>
                                <p className="mt-2 text-sm text-foreground/80">
                                    {project.architectureHighlight}
                                </p>
                            </div>
                        </div>
                        <div className="mt-4">
                            <h4 className="text-sm font-semibold uppercase tracking-wider text-muted">
                                Key Features
                            </h4>
                            <ul className="mt-2 grid gap-1 text-sm text-foreground/80 md:grid-cols-2">
                                {project.features.map((f) => (
                                    <li key={f} className="flex items-start gap-2">
                                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                                        {f}
                                    </li>
                                ))}
                            </ul>
                            {/* Security Details */}
                            {project.securityDetails && (
                                <div className="mt-4">
                                    <h4 className="text-sm font-semibold uppercase tracking-wider text-muted">
                                        Security Details
                                    </h4>
                                    <p className="mt-2 text-sm text-foreground/80">
                                        {project.securityDetails}
                                    </p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
}

// ─── Main section ─────────────────────────────────────────────────────────────
export default function Projects() {
    const [expandedIdx, setExpandedIdx] = useState<number | null>(null);
    const [activeScreenshots, setActiveScreenshots] = useState<Record<number, number>>({});
    const [videoModalProject, setVideoModalProject] = useState<Project | null>(null);

    return (
        <section id="projects" className="py-20 overflow-hidden px-6 md:px-8">
            <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="mb-2 text-center text-sm font-semibold uppercase tracking-widest text-primary"
            >
                Featured Work
            </motion.p>
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="mb-4 text-center text-3xl font-bold tracking-tight sm:text-4xl"
            >
                Projects that <span className="gradient-text">solve real problems</span>
            </motion.h2>
            <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="mb-12 text-center text-muted"
            >
                Each project was built to address a specific challenge with production-grade quality.
            </motion.p>

            <div className="space-y-12">
                {projects.map((project, i) => (
                    <ProjectCard
                        key={project.title}
                        project={project}
                        i={i}
                        expandedIdx={expandedIdx}
                        setExpandedIdx={setExpandedIdx}
                        activeScreenshots={activeScreenshots}
                        setActiveScreenshots={setActiveScreenshots}
                        onOpenModal={setVideoModalProject}
                    />
                ))}
            </div>

            {/* Cinema Video Player Modal — lazy loaded */}
            <ProjectVideoModal
                isOpen={!!videoModalProject}
                project={videoModalProject}
                onClose={() => setVideoModalProject(null)}
            />
        </section>
    );
}
