"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionWrapperProps {
    id: string;
    children: React.ReactNode;
    className?: string;
}

export default function SectionWrapper({ id, children, className }: SectionWrapperProps) {
    return (
        <motion.section
            id={id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className={cn("relative mx-auto w-full max-w-[1600px] px-6 py-24 md:px-8 lg:py-32", className)}
        >
            {children}
        </motion.section>
    );
}
