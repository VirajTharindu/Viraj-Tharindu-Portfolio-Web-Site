"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowRight, Sun, Moon, X } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

const commands = [
    { label: "Go to Home", action: "#hero", type: "navigate" as const },
    { label: "Go to About", action: "#about", type: "navigate" as const },
    { label: "Go to Skills", action: "#skills", type: "navigate" as const },
    { label: "Go to Projects", action: "#projects", type: "navigate" as const },
    { label: "Go to Experience", action: "#experience", type: "navigate" as const },
    { label: "Go to Contact", action: "#contact", type: "navigate" as const },
    { label: "Toggle Theme", action: "theme", type: "action" as const },
];

export default function CommandPalette() {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const { theme, toggleTheme } = useTheme();

    const filtered = commands.filter((c) =>
        c.label.toLowerCase().includes(query.toLowerCase())
    );

    const execute = useCallback(
        (cmd: (typeof commands)[0]) => {
            if (cmd.type === "navigate") {
                const el = document.querySelector(cmd.action);
                el?.scrollIntoView({ behavior: "smooth" });
            } else if (cmd.action === "theme") {
                toggleTheme();
            }
            setOpen(false);
            setQuery("");
        },
        [toggleTheme]
    );

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key === "k") {
                e.preventDefault();
                setOpen((prev) => !prev);
                setQuery("");
            }
            if (e.key === "Escape") {
                setOpen(false);
                setQuery("");
            }
        };
        document.addEventListener("keydown", handler);
        return () => document.removeEventListener("keydown", handler);
    }, []);

    return (
        <AnimatePresence>
            {open && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => {
                            setOpen(false);
                            setQuery("");
                        }}
                        className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
                    />

                    {/* Palette */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="fixed left-1/2 top-[20%] z-[101] w-full max-w-lg -translate-x-1/2 overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl"
                    >
                        {/* Search input */}
                        <div className="flex items-center gap-3 border-b border-border px-4 py-3">
                            <Search size={18} className="text-muted" />
                            <input
                                autoFocus
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Type a command or search…"
                                className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted/50"
                            />
                            <button
                                onClick={() => {
                                    setOpen(false);
                                    setQuery("");
                                }}
                                className="rounded p-1 text-muted hover:text-foreground"
                            >
                                <X size={16} />
                            </button>
                        </div>

                        {/* Results */}
                        <div className="max-h-72 overflow-y-auto p-2">
                            {filtered.length === 0 && (
                                <p className="px-3 py-6 text-center text-sm text-muted">
                                    No results found.
                                </p>
                            )}
                            {filtered.map((cmd) => (
                                <button
                                    key={cmd.label}
                                    onClick={() => execute(cmd)}
                                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-foreground/80 transition-colors hover:bg-surface-light hover:text-foreground"
                                >
                                    {cmd.action === "theme" ? (
                                        theme === "dark" ? (
                                            <Sun size={16} className="text-primary" />
                                        ) : (
                                            <Moon size={16} className="text-primary" />
                                        )
                                    ) : (
                                        <ArrowRight size={16} className="text-primary" />
                                    )}
                                    <span>{cmd.label}</span>
                                </button>
                            ))}
                        </div>

                        {/* Footer hint */}
                        <div className="border-t border-border px-4 py-2 text-xs text-muted">
                            <kbd className="rounded border border-border bg-surface-light px-1.5 py-0.5 font-mono text-[10px]">
                                ESC
                            </kbd>{" "}
                            to close
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
