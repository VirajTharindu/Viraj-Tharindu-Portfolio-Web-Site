"use client";

import SectionWrapper from "@/components/ui/SectionWrapper";
import { referencesData } from "@/data/references";
import { motion } from "framer-motion";
import { Phone, Mail, Building2, UserCheck, ShieldCheck } from "lucide-react";

export default function References() {
    return (
        <SectionWrapper id="references">
            <div className="relative">
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mb-2 text-center text-sm font-semibold uppercase tracking-widest text-primary"
                >
                    References
                </motion.p>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="mb-4 text-center text-3xl font-bold tracking-tight sm:text-4xl"
                >
                    Professional <span className="gradient-text">References</span>
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 }}
                    className="mx-auto mb-12 max-w-xl text-center text-sm text-muted"
                >
                    Official professional and industry contacts available for career reference and background verification.
                </motion.p>

                <div className="mx-auto max-w-3xl">
                    <div className="grid gap-6">
                        {referencesData.map((ref, i) => (
                            <motion.div
                                key={ref.name}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                                className="group relative"
                            >
                                {/* Ambient Glow */}
                                <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 opacity-40 blur-lg transition-all duration-300 group-hover:opacity-75" />

                                {/* Card */}
                                <div className="relative glass rounded-2xl p-6 sm:p-8 transition-all duration-300 hover:border-primary/40">
                                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
                                        {/* Profile info */}
                                        <div className="flex items-start gap-4">
                                            <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 via-surface-light to-surface text-base font-bold text-primary border border-primary/30 shadow-inner">
                                                <UserCheck size={26} className="text-primary" />
                                                <div className="absolute -bottom-1 -right-1 rounded-full bg-background p-0.5">
                                                    <ShieldCheck size={14} className="text-accent fill-accent text-background" />
                                                </div>
                                            </div>

                                            <div>
                                                <div className="flex flex-wrap items-center gap-2.5">
                                                    <h3 className="text-lg sm:text-xl font-bold text-foreground">
                                                        {ref.name}
                                                    </h3>
                                                    <span className="inline-flex items-center rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-semibold text-accent border border-accent/20">
                                                        Industry Reference
                                                    </span>
                                                </div>

                                                <p className="mt-1 text-sm font-medium text-primary-light">
                                                    {ref.title}
                                                </p>

                                                <div className="mt-2 flex items-center gap-2 text-xs sm:text-sm text-muted">
                                                    <Building2 size={15} className="shrink-0 text-primary/70" />
                                                    <span>{ref.organization}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Contact Details Bar */}
                                    <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-border/40 pt-5">
                                        <a
                                            href={`tel:${ref.phone.replace(/\s+/g, "")}`}
                                            className="inline-flex items-center gap-2 rounded-xl border border-border/60 bg-surface/60 px-4 py-2 text-xs sm:text-sm text-muted transition-all duration-200 hover:border-primary/50 hover:bg-surface-light hover:text-foreground hover:shadow-sm"
                                        >
                                            <Phone size={14} className="text-primary" />
                                            <span>{ref.phone}</span>
                                        </a>

                                        <a
                                            href={`mailto:${ref.email}`}
                                            className="inline-flex items-center gap-2 rounded-xl border border-border/60 bg-surface/60 px-4 py-2 text-xs sm:text-sm text-muted transition-all duration-200 hover:border-primary/50 hover:bg-surface-light hover:text-foreground hover:shadow-sm"
                                        >
                                            <Mail size={14} className="text-primary" />
                                            <span>{ref.email}</span>
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
}
