"use client";

import { skillGroups } from "@/data/skills";
import { experienceData } from "@/data/experience";
import { projects } from "@/data/projects";
import { ArrowLeft, Download, Mail, MapPin, Globe } from "lucide-react";
import Link from "next/link";

export default function ResumePage() {
    const allSkills = skillGroups.flatMap((g) => g.skills.map((s) => s.name));
    const workExperience = experienceData.filter((e) => e.type === "work");
    const education = experienceData.filter((e) => e.type === "education");

    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* Action bar — hidden in print */}
            <div className="no-print sticky top-0 z-50 glass border-b border-border">
                <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-foreground transition-colors"
                    >
                        <ArrowLeft size={16} />
                        Back to Portfolio
                    </Link>
                    <button
                        onClick={() => window.print()}
                        className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-primary-light hover:shadow-lg hover:shadow-primary/25"
                    >
                        <Download size={16} />
                        Download PDF
                    </button>
                </div>
            </div>

            {/* Resume Content */}
            <div className="mx-auto max-w-4xl px-6 py-12 print:py-0 print:px-0">
                {/* Header */}
                <header className="mb-8 border-b border-border pb-8 print:border-black/20">
                    <h1 className="text-4xl font-bold tracking-tight print:text-3xl">Viraj Tharindu</h1>
                    <p className="mt-2 text-xl text-primary print:text-lg print:text-black">
                        Full-Stack Software Engineer
                    </p>
                    <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted print:text-black/70">
                        <span className="inline-flex items-center gap-1.5">
                            <Mail size={14} /> vjstyles@email.com
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                            <Globe size={14} /> vjstyles.dev
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                            <MapPin size={14} /> Available Worldwide
                        </span>
                    </div>
                </header>

                {/* Summary */}
                <section className="mb-8">
                    <h2 className="mb-3 text-lg font-bold uppercase tracking-wider text-primary print:text-black">
                        Professional Summary
                    </h2>
                    <p className="text-sm leading-relaxed text-muted print:text-black/80">
                        Full-stack software engineer with a passion for building robust, scalable web applications.
                        Experienced across the entire development lifecycle — from architecting databases to crafting
                        pixel-perfect interfaces. Focus areas include real-time systems, RESTful and WebSocket
                        architectures, and creating developer experiences that ship faster.
                    </p>
                </section>

                {/* Experience */}
                <section className="mb-8">
                    <h2 className="mb-4 text-lg font-bold uppercase tracking-wider text-primary print:text-black">
                        Experience
                    </h2>
                    <div className="space-y-6">
                        {workExperience.map((job) => (
                            <div key={`${job.title}-${job.organization}`}>
                                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                                    <h3 className="font-bold">{job.title}</h3>
                                    <span className="text-xs text-muted print:text-black/60">{job.duration}</span>
                                </div>
                                <p className="text-sm text-primary-light print:text-black/70">{job.organization}</p>
                                {job.projects && job.projects.length > 0 ? (
                                    <div className="mt-3 space-y-3">
                                        {job.projects.map((proj) => (
                                            <div key={proj.name} className="border-l-2 border-primary/30 pl-3">
                                                <div className="flex flex-wrap items-baseline gap-2">
                                                    <h4 className="text-sm font-semibold">{proj.name}</h4>
                                                    {proj.category && (
                                                        <span className="text-xs text-muted print:text-black/60">
                                                            — {proj.category}
                                                        </span>
                                                    )}
                                                </div>
                                                {proj.tech && (
                                                    <p className="mt-0.5 text-xs text-primary-light print:text-black/60">
                                                        Tech: {proj.tech.join(" · ")}
                                                    </p>
                                                )}
                                                <ul className="mt-1.5 space-y-1">
                                                    {proj.highlights.map((h) => (
                                                        <li key={h} className="flex items-start gap-2 text-sm text-muted print:text-black/80">
                                                            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent print:bg-black" />
                                                            {h}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    job.highlights && (
                                        <ul className="mt-2 space-y-1">
                                            {job.highlights.map((h) => (
                                                <li key={h} className="flex items-start gap-2 text-sm text-muted print:text-black/80">
                                                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent print:bg-black" />
                                                    {h}
                                                </li>
                                            ))}
                                        </ul>
                                    )
                                )}
                            </div>
                        ))}
                    </div>
                </section>

                {/* Key Projects */}
                <section className="mb-8">
                    <h2 className="mb-4 text-lg font-bold uppercase tracking-wider text-primary print:text-black">
                        Key Projects
                    </h2>
                    <div className="space-y-4">
                        {projects.slice(0, 3).map((project) => (
                            <div key={project.title}>
                                <h3 className="font-bold">{project.title}</h3>
                                <p className="text-sm text-muted print:text-black/80">{project.description}</p>
                                <p className="mt-1 text-xs text-primary-light print:text-black/60">
                                    Tech: {project.techStack.join(" · ")}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Skills */}
                <section className="mb-8">
                    <h2 className="mb-3 text-lg font-bold uppercase tracking-wider text-primary print:text-black">
                        Technical Skills
                    </h2>
                    <div className="flex flex-wrap gap-2">
                        {allSkills.map((skill) => (
                            <span
                                key={skill}
                                className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary-light print:bg-gray-100 print:text-black"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </section>

                {/* Education */}
                <section className="mb-8">
                    <h2 className="mb-4 text-lg font-bold uppercase tracking-wider text-primary print:text-black">
                        Education
                    </h2>
                    {education.map((edu) => (
                        <div key={`${edu.title}-${edu.organization}`}>
                            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                                <h3 className="font-bold">{edu.title}</h3>
                                <span className="text-xs text-muted print:text-black/60">{edu.duration}</span>
                            </div>
                            <p className="text-sm text-primary-light print:text-black/70">{edu.organization}</p>
                            <ul className="mt-2 space-y-1">
                                {edu.highlights?.map((h) => (
                                    <li key={h} className="flex items-start gap-2 text-sm text-muted print:text-black/80">
                                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent print:bg-black" />
                                        {h}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </section>
            </div>
        </div>
    );
}
