"use client";

import SectionWrapper from "@/components/ui/SectionWrapper";
import { skillGroups } from "@/data/skills";
import { motion } from "framer-motion";
import {
    Monitor, Layers, FileCode, Palette, Sparkles,
    Server, Box, Boxes, Terminal, GitBranch,
    Database, HardDrive, Zap,
    Container, RefreshCw, Code2, ShieldCheck,
    Lock, Cpu, Smartphone, Workflow, CheckCircle2,
    Cloud, Gauge, Layout, Users, Wrench, Search,
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ size?: number }>> = {
    Monitor, Layers, FileCode, Palette, Sparkles,
    Server, Box, Boxes, Terminal, GitBranch,
    Database, HardDrive, Zap,
    Container, RefreshCw, Code2, ShieldCheck,
    Lock, Cpu, Smartphone, Workflow, CheckCircle2,
    Cloud, Gauge, Layout, Users, Wrench, Search,
};

export default function Skills() {
    return (
        <SectionWrapper id="skills">
            <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="mb-2 text-center text-sm font-semibold uppercase tracking-widest text-primary"
            >
                Skills & Technologies
            </motion.p>
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="mb-12 text-center text-3xl font-bold tracking-tight sm:text-4xl"
            >
                My <span className="gradient-text">technical toolkit</span>
            </motion.h2>

            {/* Bento Grid */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                {skillGroups.map((group, gi) => {
                    const isLarge = group.size === "lg";
                    return (
                        <motion.div
                            key={group.category}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-60px" }}
                            transition={{ duration: 0.5, delay: gi * 0.08 }}
                            className={`glass relative flex flex-col justify-between overflow-hidden rounded-2xl p-6 transition-all hover:border-primary/40 group/card
                                ${isLarge ? "lg:col-span-2 lg:row-span-1" : "lg:col-span-1"}`}
                        >
                            {/* Decorative glow */}
                            <div className="absolute top-0 right-0 -mr-8 -mt-8 h-40 w-40 rounded-full bg-primary/5 blur-3xl transition-colors group-hover/card:bg-primary/10" />

                            <div>
                                <div className="flex items-center justify-between mb-5">
                                    <h3 className="flex items-center gap-3 text-lg font-bold text-foreground">
                                        <span className="h-2 w-2 rounded-full bg-primary" />
                                        {group.category}
                                    </h3>
                                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary-light">
                                        {group.skills.length} skills
                                    </span>
                                </div>

                                <div className={`grid gap-3 ${isLarge ? "sm:grid-cols-2" : "grid-cols-1"}`}>
                                    {group.skills.map((skill, si) => {
                                        const Icon = iconMap[skill.icon] || Monitor;
                                        return (
                                            <motion.div
                                                key={skill.name}
                                                initial={{ opacity: 0, x: -8 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: Math.min(0.35, (gi * 0.04) + (si * 0.02)) }}
                                                className="group flex items-center gap-3 rounded-xl border border-transparent p-2.5 transition-all hover:border-border hover:bg-surface-light/30"
                                            >
                                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-surface text-primary shadow-sm border border-border/50 transition-transform group-hover:scale-110">
                                                    <Icon size={18} />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-semibold text-foreground">{skill.name}</p>
                                                    <p className="truncate text-xs text-muted" title={skill.proof}>{skill.proof}</p>
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </SectionWrapper>
    );
}
