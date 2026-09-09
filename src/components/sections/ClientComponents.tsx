"use client";

import dynamic from "next/dynamic";

export const Navbar = dynamic(() => import("@/components/Navbar"), { ssr: false });
export const ScrollProgress = dynamic(() => import("@/components/ui/ScrollProgress"), { ssr: false });
export const CommandPalette = dynamic(() => import("@/components/CommandPalette"), { ssr: false });
export const Hero = dynamic(() => import("@/components/sections/Hero"), { ssr: false });
export const Projects = dynamic(() => import("@/components/sections/Projects"), { ssr: false });
