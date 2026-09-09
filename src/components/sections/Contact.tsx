"use client";

import SectionWrapper from "@/components/ui/SectionWrapper";
import { motion } from "framer-motion";
import { Send, Mail, MapPin, ArrowUpRight } from "lucide-react";
import { useState, FormEvent } from "react";

export default function Contact() {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const data = new FormData(form);
        try {
            const response = await fetch("https://formspree.io/f/mjyvewjw", {
                method: "POST",
                body: data,
                headers: { Accept: "application/json" },
            });
            if (response.ok) {
                setSubmitted(true);
                form.reset(); // clear fields
                setTimeout(() => setSubmitted(false), 3000);
            } else {
                console.error("Form submission error", response);
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <SectionWrapper id="contact">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
                {/* Left — CTA */}
                <div>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary"
                    >
                        Get in Touch
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl font-bold tracking-tight sm:text-4xl"
                    >
                        Let&apos;s build something
                        <br />
                        <span className="gradient-text">amazing together</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="mt-6 text-lg text-muted"
                    >
                        I&apos;m always interested in hearing about new projects, opportunities,
                        and collaborations. Feel free to reach out!
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="mt-8 space-y-4"
                    >
                        <a
                            href="mailto:virajtharindu1997@gmail.com"
                            className="group flex items-center gap-3 text-muted transition-colors hover:text-foreground"
                        >
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                <Mail size={18} />
                            </div>
                            <span>virajtharindu1997@gmail.com</span>
                            <ArrowUpRight
                                size={14}
                                className="opacity-0 transition-opacity group-hover:opacity-100"
                            />
                        </a>
                        <div className="flex items-center gap-3 text-muted">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                <MapPin size={18} />
                            </div>
                            <span>Available Worldwide — Remote</span>
                        </div>
                    </motion.div>
                </div>

                {/* Right — Form */}
                <motion.form
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="glass space-y-5 rounded-2xl p-6 md:p-8"
                >
                    <div>
                        <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-muted">
                            Name
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            required
                            placeholder="Your name"
                            className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted/50 focus:border-primary"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-muted">
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            placeholder="you@example.com"
                            className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted/50 focus:border-primary"
                        />
                    </div>
                    <div>
                        <label htmlFor="about" className="mb-1.5 block text-sm font-medium text-muted">
                            About
                        </label>
                        <textarea
                            id="about"
                            name="about"
                            rows={3}
                            placeholder="A short intro..."
                            className="w-full resize-none rounded-lg border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted/50 focus:border-primary"
                        />
                    </div>

                    <div>
                        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-muted">
                            Message
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            required
                            rows={4}
                            placeholder="Tell me about your project..."
                            className="w-full resize-none rounded-lg border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted/50 focus:border-primary"
                        />
                    </div>
                    <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-medium text-white transition-all hover:bg-primary-light hover:shadow-lg hover:shadow-primary/25"
                    >
                        {submitted ? (
                            "Message Sent! ✓"
                        ) : (
                            <>
                                Send Message
                                <Send size={16} />
                            </>
                        )}
                    </motion.button>
                </motion.form>
            </div>
        </SectionWrapper>
    );
}
