"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ExternalLink } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";
import { useRef } from "react";
import Image from "next/image";

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
    const imageY = useTransform(scrollYProgress, [0, 1], [0, 100]);
    const contentOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
    const contentScale = useTransform(scrollYProgress, [0, 0.4], [1, 0.95]);

    return (
        <section
            id="hero"
            ref={containerRef}
            className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 md:px-8"
        >
            {/* Aesthetic Background Image */}
            <motion.div
                style={{ y: imageY }}
                animate={{
                    scale: [1.02, 1.04, 1.02],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute inset-0 z-0 opacity-[0.8] contrast-100 brightness-100 pointer-events-none overflow-hidden"
            >
                <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background/10 z-10" />
                <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background/10 z-10" />
                <Image
                    src="/profile_main.png"
                    alt=""
                    fill
                    priority
                    quality={85}
                    sizes="(max-width: 768px) 100vw, 60vw"
                    className="object-contain object-right-top origin-top-right scale-[0.90]"
                    style={{
                        maskImage: 'radial-gradient(circle at 75% 40%, black 45%, transparent 85%)',
                        WebkitMaskImage: 'radial-gradient(circle at 75% 40%, black 45%, transparent 85%)'
                    }}
                />
            </motion.div>

            {/* Parallax Orbs */}
            <motion.div
                style={{ y: y1 }}
                className="gradient-orb left-[-10%] top-[-10%] h-[500px] w-[500px] bg-primary/40"
            />
            <motion.div
                style={{ y: y2 }}
                className="gradient-orb bottom-[-10%] right-[-10%] h-[400px] w-[400px] bg-accent/30"
            />
            <div className="gradient-orb left-[40%] top-[60%] h-[300px] w-[300px] bg-primary-light/20 shadow-2xl" />

            <motion.div
                style={{ opacity: contentOpacity, scale: contentScale }}
                className="relative z-10 mx-auto grid max-w-[1600px] w-full gap-12 lg:grid-cols-2 lg:gap-8"
            >
                {/* Left — Text */}
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="flex flex-col justify-center"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary-light"
                    >
                        <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                        Available for opportunities
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl"
                    >
                        Software Engineer
                        <br />
                        <span className="gradient-text">building scalable</span>
                        <br />
                        web systems
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                        className="mt-6 max-w-lg text-lg leading-relaxed text-muted"
                    >
                        I craft high-performance full-stack applications that solve real-world
                        problems — from real-time dashboards to enterprise-grade systems.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 0.6 }}
                        className="mt-8 flex flex-wrap gap-4"
                    >
                        <MagneticButton strength={0.3}>
                            <a
                                href="#projects"
                                className="group inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-medium text-white transition-all hover:bg-primary-light hover:shadow-lg hover:shadow-primary/25"
                            >
                                View My Work
                                <ExternalLink size={16} className="transition-transform group-hover:translate-x-0.5" />
                            </a>
                        </MagneticButton>
                        <MagneticButton strength={0.3}>
                            <a
                                href="#contact"
                                className="inline-flex items-center gap-2 rounded-xl border border-border px-6 py-3 font-medium text-foreground transition-all hover:border-primary hover:bg-surface-light"
                            >
                                Get in Touch
                            </a>
                        </MagneticButton>
                    </motion.div>
                </motion.div>

                {/* Right — Animated code mock */}
                <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                    className="hidden items-center justify-center lg:flex"
                >
                    <div className="glass w-full max-w-md rounded-2xl p-6">
                        <div className="mb-4 flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full bg-red-500/80" />
                            <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                            <div className="h-3 w-3 rounded-full bg-green-500/80" />
                            <span className="ml-2 text-xs text-muted font-mono">portfolio.tsx</span>
                        </div>
                        <pre className="text-sm leading-relaxed">
                            <code>
                                <Line delay={0.6}>
                                    <span className="text-primary font-semibold">const</span>{" "}
                                    <span className="text-foreground font-medium">developer</span>{" "}
                                    <span className="text-muted">=</span> <span className="text-foreground">{"{"}</span>
                                </Line>
                                <Line delay={0.8} indent>
                                    <span className="text-foreground/90">name</span>
                                    <span className="text-muted">:</span>{" "}
                                    <span className="text-accent">&quot;Viraj Tharindu&quot;</span>
                                    <span className="text-muted">,</span>
                                </Line>
                                <Line delay={1.0} indent>
                                    <span className="text-foreground/90">role</span>
                                    <span className="text-muted">:</span>{" "}
                                    <span className="text-accent">&quot;Full-Stack Engineer&quot;</span>
                                    <span className="text-muted">,</span>
                                </Line>
                                <Line delay={1.2} indent>
                                    <span className="text-foreground/90">skills</span>
                                    <span className="text-muted">: [</span>
                                    <span className="text-accent">&quot;React&quot;</span>
                                    <span className="text-muted">, </span>
                                    <span className="text-accent">&quot;Next.js&quot;</span>
                                    <span className="text-muted">, </span>
                                    <span className="text-accent">&quot;Node.js&quot;</span>
                                    <span className="text-muted">,</span>
                                </Line>
                                <Line delay={1.4} indent2>
                                    <span className="text-accent">&quot;TypeScript&quot;</span>
                                    <span className="text-muted">, </span>
                                    <span className="text-accent">&quot;Tailwind&quot;</span>
                                    <span className="text-muted">, </span>
                                    <span className="text-accent">&quot;PostgreSQL&quot;</span>
                                    <span className="text-muted">],</span>
                                </Line>
                                <Line delay={1.6} indent>
                                    <span className="text-foreground/90">passion</span>
                                    <span className="text-muted">:</span>{" "}
                                    <span className="text-accent">&quot;Building systems</span>
                                </Line>
                                <Line delay={1.8} indent2>
                                    <span className="text-accent">that scale&quot;</span>
                                    <span className="text-muted">,</span>
                                </Line>
                                <Line delay={2.0}>
                                    <span className="text-foreground">{"};"}</span>
                                </Line>
                            </code>
                        </pre>
                    </div>
                </motion.div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5, duration: 1 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
            >
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                >
                    <ArrowDown size={20} className="text-muted" />
                </motion.div>
            </motion.div>
        </section>
    );
}

function Line({ children, delay, indent, indent2 }: { children: React.ReactNode; delay: number; indent?: boolean; indent2?: boolean }) {
    return (
        <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay, duration: 0.3 }}
            className="block font-mono text-xs sm:text-sm"
        >
            {indent2 && <span className="select-none text-muted/30">{"        "}</span>}
            {indent && !indent2 && <span className="select-none text-muted/30">{"    "}</span>}
            {children}
        </motion.span>
    );
}
