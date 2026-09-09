"use client";

import SectionWrapper from "@/components/ui/SectionWrapper";
import { User, Target, Rocket, Code2, Database } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function About() {
    return (
        <SectionWrapper id="about">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-start">
                {/* Left — Professional Summary */}
                <div>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary"
                    >
                        About Me
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl font-bold tracking-tight sm:text-4xl"
                    >
                        Engineering software that
                        <br />
                        <span className="gradient-text">makes an impact</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="mt-6 text-lg leading-relaxed text-muted"
                    >
                        I&apos;m a full-stack software engineer with a passion for building
                        robust, scalable web applications. With experience across the entire
                        development lifecycle — from architecting databases to crafting
                        pixel-perfect interfaces — I bring ideas to production with speed and
                        precision.
                    </motion.p>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="mt-4 text-lg leading-relaxed text-muted"
                    >
                        My focus areas include building responsive web applications, creative landing 2D/3D pages, real-time systems, RESTful APIs and creating seamless and scalable developer experiences that ship faster.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="mt-8 flex flex-wrap gap-3"
                    >
                        <span className="flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm text-foreground">
                            <Code2 size={16} className="text-primary" /> Full-Stack
                        </span>
                        <span className="flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm text-foreground">
                            <Target size={16} className="text-accent" /> Strategy
                        </span>
                        <span className="flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm text-foreground">
                            <Rocket size={16} className="text-primary-light" /> Scale
                        </span>
                    </motion.div>
                </div>

                {/* Right — Interactive 3D Image Card */}
                <div className="relative group/about-image perspective-1000 hidden lg:block">
                    <motion.div
                        initial={{ opacity: 0, rotateY: -15, scale: 0.95 }}
                        whileInView={{ opacity: 1, rotateY: -5, scale: 1 }}
                        whileHover={{ rotateY: 5, scale: 1.02 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="relative z-10 aspect-[3/2] w-full max-w-md lg:max-w-lg ml-auto overflow-hidden rounded-3xl glass p-2 shadow-2xl transition-all duration-500 hover:shadow-primary/20"
                    >
                        <div className="relative h-full w-full overflow-hidden rounded-[1.25rem]">
                            <Image
                                src="/working.png"
                                alt="Viraj Tharindu Coding"
                                fill
                                quality={80}
                                sizes="(max-width: 1024px) 0vw, 45vw"
                                className="object-cover object-center transition-transform duration-700 group-hover/about-image:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                        </div>

                        {/* Floating Micro-Badges */}
                        <motion.div
                            animate={{ y: [0, -6, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute left-4 top-4 glass flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 shadow-lg backdrop-blur-md border border-border/60"
                        >
                            <div className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                            <span className="text-[11px] font-medium tracking-wide">Solving Complexity</span>
                        </motion.div>

                        <motion.div
                            animate={{ y: [0, 6, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            className="absolute right-4 bottom-4 glass flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 shadow-lg backdrop-blur-md border border-border/60"
                        >
                            <Code2 size={13} className="text-primary" />
                            <span className="text-[11px] font-medium tracking-wide">Production Ready</span>
                        </motion.div>
                    </motion.div>

                    {/* Background decorative elements */}
                    <div className="absolute -bottom-6 -left-6 h-32 w-32 rounded-full bg-primary/10 blur-3xl" />
                    <div className="absolute -top-6 -right-6 h-32 w-32 rounded-full bg-accent/10 blur-3xl" />
                </div>

                {/* Mobile/Tablet Fallback — Technical Focus Cards */}
                <div className="grid gap-4 sm:grid-cols-2 lg:hidden">
                    {[
                        {
                            icon: Database,
                            title: "Scalable Systems",
                            desc: "Designing high-availability architectures and efficient data pipelines for modern enterprises.",
                            color: "text-primary"
                        },
                        {
                            icon: User,
                            title: "User-Centric Design",
                            desc: "Creating intuitive interfaces that prioritize developer experience and end-user flows.",
                            color: "text-accent"
                        }
                    ].map((item, i) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 * i }}
                            className="glass group flex flex-col gap-3 rounded-2xl p-6 transition-all hover:border-primary/40"
                        >
                            <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-surface-light ${item.color} transition-transform group-hover:scale-110`}>
                                <item.icon size={24} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold">{item.title}</h3>
                                <p className="mt-2 text-sm leading-relaxed text-muted">{item.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </SectionWrapper>
    );
}
