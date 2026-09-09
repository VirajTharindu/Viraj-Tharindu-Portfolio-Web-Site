"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, Command } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/components/ThemeProvider";

const navLinks = [
    { label: "Home", href: "#hero" },
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Skills", href: "#skills" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "References", href: "#references" },
    { label: "Contact", href: "#contact" },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { theme, toggleTheme } = useTheme();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const handleClick = () => setIsOpen(false);

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className={cn(
                "fixed top-0 left-0 z-50 w-full transition-all duration-300",
                scrolled ? "glass shadow-lg" : "bg-transparent"
            )}
        >
            <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-8">
                {/* Logo */}
                <a href="#hero" className="group flex items-center gap-2">
                    <span className="text-xl font-bold tracking-tight">
                        <span className="gradient-text">Viraj</span>
                        <span className="text-foreground"> Tharindu</span>
                    </span>
                </a>

                {/* Desktop nav */}
                <div className="hidden items-center gap-1 md:flex">
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="relative rounded-lg px-4 py-2 text-sm font-medium text-muted transition-colors hover:text-foreground"
                        >
                            {link.label}
                        </a>
                    ))}
                    <div className="ml-4 flex items-center gap-2">
                        <button
                            onClick={toggleTheme}
                            className="rounded-lg p-2 text-muted transition-colors hover:bg-surface-light hover:text-foreground"
                            aria-label="Toggle theme"
                        >
                            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                        </button>
                        <button
                            onClick={() => {
                                const ev = new KeyboardEvent("keydown", { key: "k", ctrlKey: true });
                                document.dispatchEvent(ev);
                            }}
                            className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs text-muted transition-colors hover:border-primary hover:text-foreground"
                        >
                            <Command size={12} />
                            <span>K</span>
                        </button>
                    </div>
                </div>

                {/* Mobile toggle */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="rounded-lg p-2 text-muted md:hidden"
                    aria-label="Toggle menu"
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="glass overflow-hidden border-t border-border md:hidden"
                    >
                        <div className="flex flex-col gap-1 px-6 py-4">
                            {navLinks.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    onClick={handleClick}
                                    className="rounded-lg px-4 py-3 text-sm font-medium text-muted transition-colors hover:bg-surface-light hover:text-foreground"
                                >
                                    {link.label}
                                </a>
                            ))}
                            <button
                                onClick={toggleTheme}
                                className="mt-2 flex items-center gap-2 rounded-lg px-4 py-3 text-sm text-muted transition-colors hover:bg-surface-light hover:text-foreground"
                            >
                                {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
                                <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
