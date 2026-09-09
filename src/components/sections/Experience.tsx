"use client";

import SectionWrapper from "@/components/ui/SectionWrapper";
import { experienceData } from "@/data/experience";
import { motion, useScroll, useSpring } from "framer-motion";
import { Briefcase, GraduationCap, Calendar, Building2, Smartphone, Monitor } from "lucide-react";
import { useRef } from "react";

export default function Experience() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 80%", "end 20%"],
    });

    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <SectionWrapper id="experience">
            <div ref={containerRef} className="relative">
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mb-2 text-center text-sm font-semibold uppercase tracking-widest text-primary"
                >
                    Experience & Education
                </motion.p>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="mb-12 text-center text-3xl font-bold tracking-tight sm:text-4xl"
                >
                    My <span className="gradient-text">professional journey</span>
                </motion.h2>

                <div className="relative">
                    {/* Background line (muted) */}
                    <div className="absolute left-[19px] top-0 h-full w-px bg-border/30 md:left-1/2 md:-translate-x-px" />

                    {/* Animated growing line */}
                    <motion.div
                        style={{ scaleY, originY: 0 }}
                        className="absolute left-[19px] top-0 h-full w-px bg-primary md:left-1/2 md:-translate-x-px"
                    />

                    <div className="space-y-12">
                        {experienceData.map((item, i) => {
                            const isLeft = i % 2 === 0;
                            const Icon = item.type === "work" ? Briefcase : GraduationCap;

                            return (
                                <motion.div
                                    key={`${item.title}-${item.organization}`}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ delay: i * 0.1, duration: 0.5 }}
                                    className="relative flex flex-col md:flex-row"
                                >
                                    {/* Desktop: position card left or right */}
                                    <div
                                        className={`w-full md:w-1/2 ${
                                            isLeft ? "md:pr-10" : "md:pl-10 md:ml-auto"
                                        }`}
                                    >
                                        {/* Mobile: offset for timeline dot */}
                                        <div className="ml-12 md:ml-0">
                                            <div className={`glass rounded-2xl transition-all duration-300 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 ${item.type === "work" ? "p-8 md:p-10" : "p-6"}`}>
                                                {/* Card Header */}
                                                <div className={`flex flex-wrap items-center justify-between gap-2 border-b border-border/40 ${item.type === "work" ? "pb-4" : "pb-3"}`}>
                                                    <span className={`inline-flex items-center gap-1.5 rounded-full bg-primary/10 font-medium text-primary-light border border-primary/20 ${item.type === "work" ? "px-4 py-1.5 text-sm" : "px-3 py-1 text-xs"}`}>
                                                        <Calendar size={item.type === "work" ? 14 : 12} />
                                                        {item.duration}
                                                    </span>
                                                    <span className={`font-semibold uppercase tracking-wider text-accent ${item.type === "work" ? "text-xs" : "text-[11px]"}`}>
                                                        {item.type === "work" ? "Industry Experience" : "Education"}
                                                    </span>
                                                </div>

                                                <h3 className={`font-bold text-foreground ${item.type === "work" ? "mt-4 text-2xl sm:text-3xl" : "mt-3 text-lg sm:text-xl"}`}>
                                                    {item.title}
                                                </h3>
                                                <div className={`flex items-center gap-1.5 text-primary-light ${item.type === "work" ? "mt-2 text-base" : "mt-1 text-sm"}`}>
                                                    <Building2 size={item.type === "work" ? 16 : 14} className="shrink-0 text-primary" />
                                                    <span>{item.organization}</span>
                                                </div>

                                                {/* Distinct Project Sub-Cards */}
                                                {item.projects && item.projects.length > 0 ? (
                                                    <div className="mt-7 space-y-5">
                                                        {item.projects.map((proj) => {
                                                            const isMobileApp = proj.name.toLowerCase().includes("mobile") || proj.name.toLowerCase().includes("app");
                                                            const ProjIcon = isMobileApp ? Smartphone : Monitor;

                                                            return (
                                                                <div
                                                                    key={proj.name}
                                                                    className="group/proj rounded-xl border border-border/50 bg-surface/50 p-6 transition-all duration-200 hover:border-primary/30 hover:bg-surface/80 text-left"
                                                                >
                                                                    <div className="flex items-start gap-3">
                                                                        <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary border border-primary/20">
                                                                            <ProjIcon size={18} />
                                                                        </div>
                                                                        <div className="min-w-0 flex-1">
                                                                            <h4 className="text-base font-semibold text-foreground group-hover/proj:text-primary-light transition-colors">
                                                                                {proj.name}
                                                                            </h4>
                                                                            {proj.category && (
                                                                                <p className="text-xs text-muted">
                                                                                    {proj.category}
                                                                                </p>
                                                                            )}
                                                                        </div>
                                                                    </div>

                                                                    {/* Tech tags */}
                                                                    {proj.tech && (
                                                                        <div className="mt-3.5 flex flex-wrap gap-2">
                                                                            {proj.tech.map((t) => (
                                                                                <span
                                                                                    key={t}
                                                                                    className="rounded-md bg-surface-light px-2.5 py-1 text-xs font-medium text-muted border border-border/40"
                                                                                >
                                                                                    {t}
                                                                                </span>
                                                                            ))}
                                                                        </div>
                                                                    )}

                                                                    {/* Concise highlights */}
                                                                    <ul className="mt-4 space-y-2 text-sm text-muted">
                                                                        {proj.highlights.map((h) => (
                                                                            <li key={h} className="flex items-start gap-2">
                                                                                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                                                                                <span className="leading-relaxed">{h}</span>
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                ) : (
                                                    item.highlights && item.highlights.length > 0 && (
                                                        <ul className="mt-4 space-y-2 text-sm text-muted">
                                                            {item.highlights.map((h) => (
                                                                <li key={h} className="flex items-start gap-2">
                                                                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                                                                    <span className="leading-relaxed">{h}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Timeline dot */}
                                    <div className="absolute left-0 top-6 flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary bg-background shadow-lg shadow-primary/20 md:left-1/2 md:-translate-x-1/2 z-10">
                                        <Icon size={16} className="text-primary" />
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
}
