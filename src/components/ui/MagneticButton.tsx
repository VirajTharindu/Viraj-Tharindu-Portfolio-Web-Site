"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";

interface MagneticButtonProps {
    children: React.ReactNode;
    className?: string;
    strength?: number;
}

export default function MagneticButton({ children, className = "", strength = 0.3 }: MagneticButtonProps) {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springConfig = { damping: 15, stiffness: 150 };
    const smoothX = useSpring(x, springConfig);
    const smoothY = useSpring(y, springConfig);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = (e.clientX - centerX) * strength;
        const deltaY = (e.clientY - centerY) * strength;
        x.set(deltaX);
        y.set(deltaY);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            style={{ x: smoothX, y: smoothY }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`inline-block ${className}`}
            data-cursor="magnetic"
        >
            {children}
        </motion.div>
    );
}
