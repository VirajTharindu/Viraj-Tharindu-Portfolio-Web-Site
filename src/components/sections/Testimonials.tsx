"use client";

import SectionWrapper from "@/components/ui/SectionWrapper";
import { testimonials } from "@/data/testimonials";
import { motion } from "framer-motion";
import { Quote, Linkedin, ArrowUpRight, CheckCircle2 } from "lucide-react";

export default function Testimonials() {
    return (
        <SectionWrapper id="testimonials">
            <div className="relative">
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mb-2 text-center text-sm font-semibold uppercase tracking-widest text-primary"
                >
                    Testimonials
                </motion.p>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="mb-4 text-center text-3xl font-bold tracking-tight sm:text-4xl"
                >
                    What professionals<span className="gradient-text"> say about me</span>
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 }}
                    className="mx-auto mb-12 max-w-xl text-center text-sm text-muted"
                >
                    Feedback and endorsements from corporate professionals, academic supervisors and mentors who guided my career.
                </motion.p>

                <div className="mx-auto max-w-3xl">
                    {testimonials.map((t) => (
                        <motion.div
                            key={t.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="group relative"
                        >
                            {/* Ambient Glow behind card */}
                            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-primary/20 via-primary-light/10 to-accent/20 opacity-50 blur-xl transition-all duration-500 group-hover:opacity-80" />

                            {/* Main Card */}
                            <div className="relative glass rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-10 transition-all duration-300 hover:border-primary/40">
                                {/* Top Header / Status bar */}
                                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/50 pb-5">
                                    <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary-light border border-primary/20">
                                        <CheckCircle2 size={13} className="text-accent" />
                                        <span>Verified Academic Endorsement</span>
                                        <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                                    </div>
                                    <span className="text-xs font-medium text-muted">
                                        {t.date} · {t.relationship}
                                    </span>
                                </div>

                                {/* Quote */}
                                <div className="relative mt-6">
                                    <Quote
                                        size={36}
                                        className="mb-3 text-primary/30 rotate-180"
                                    />
                                    <p className="text-base sm:text-lg leading-relaxed text-foreground/90 font-light">
                                        &ldquo;{t.quote}&rdquo;
                                    </p>
                                </div>

                                {/* Recommender Profile Info + Action */}
                                <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-border/40 pt-6">
                                    <div className="flex items-center gap-3.5">
                                        <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full overflow-hidden border-2 border-primary/30 shadow-md bg-surface-light">
                                            {t.image ? (
                                                <img
                                                    src={t.image}
                                                    alt={t.name}
                                                    className="h-full w-full object-cover object-center"
                                                />
                                            ) : (
                                                <span className="text-base font-bold text-primary">
                                                    {t.avatarInitials}
                                                </span>
                                            )}
                                            <div className="absolute bottom-0 right-0 rounded-full bg-background p-0.5">
                                                <CheckCircle2 size={13} className="text-accent fill-accent text-background" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-1.5">
                                                <h3 className="text-base font-bold text-foreground">
                                                    {t.name}
                                                </h3>
                                                <span className="inline-flex items-center rounded bg-primary/10 px-1.5 py-0.5 text-[10px] font-semibold text-primary">
                                                    1st
                                                </span>
                                            </div>
                                            <p className="text-xs text-primary-light font-medium mt-0.5">
                                                {t.role}
                                            </p>
                                            <p className="text-xs text-muted mt-0.5">
                                                {t.organization}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Direct CTA button to LinkedIn */}
                                    <a
                                        href={t.linkedinUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0A66C2] px-4 py-2.5 text-xs font-semibold text-white transition-all duration-200 hover:bg-[#004182] hover:shadow-lg hover:shadow-[#0A66C2]/25 shrink-0"
                                    >
                                        <Linkedin size={14} className="fill-current" />
                                        <span>View on LinkedIn</span>
                                        <ArrowUpRight size={14} />
                                    </a>
                                </div>

                                {/* Certification Tip Callout */}
                                <div className="mt-6 rounded-xl border border-primary/20 bg-surface-light/40 p-4 transition-colors">
                                    <div className="flex items-start gap-3">
                                        <span className="text-base leading-none">💡</span>
                                        <div className="text-xs text-muted leading-relaxed">
                                            <span className="font-semibold text-foreground">
                                                Tip:
                                            </span>{" "}
                                            Refer to the{" "}
                                            <a
                                                href={t.linkedinUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="font-semibold text-primary underline underline-offset-2 hover:text-primary-light"
                                            >
                                                &quot;Recommendations&quot; section on my LinkedIn profile
                                            </a>{" "}
                                            to certify and verify this recommendation.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </SectionWrapper>
    );
}

