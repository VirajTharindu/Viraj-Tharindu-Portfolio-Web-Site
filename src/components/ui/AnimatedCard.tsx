"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedCardProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
}

export default function AnimatedCard({ children, className, delay = 0 }: AnimatedCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay, ease: "easeOut" }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className={cn(
                "glass rounded-2xl p-6 transition-shadow duration-300 hover:glow-primary",
                className
            )}
        >
            {children}
        </motion.div>
    );
}
