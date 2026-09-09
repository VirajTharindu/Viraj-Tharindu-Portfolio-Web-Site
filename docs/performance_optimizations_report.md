# Performance Optimizations Report

This document outlines the performance bottlenecks identified in the Viraj Tharindu Portfolio website, the optimizations that have already been applied, and the steps that remain to be completed.

## ✅ Completed Optimizations

### 1. Asset Optimization (Images & Videos)
- **Next.js Image Optimization**: Replaced standard HTML `<img>` tags with Next.js `<Image>` components for the massive 11MB `profile_main.png` (Hero section) and `working.png` (About section). This enables automatic conversion to lightweight WebP/AVIF formats, generates responsive `srcset`s, and adds lazy loading for off-screen images.
- **LCP Prioritization**: Added the `priority` property to the Hero profile image to ensure it loads immediately, significantly improving the Largest Contentful Paint (LCP) score.
- **Video Compression (In Progress)**: Used `ffmpeg` to re-encode the massive raw video files (`Suriya-video.mp4` and `supermarket-video.mp4`) from over 100MB+ down to ~2MB each using H.264 CRF 28 with web-optimized settings (`+faststart` for immediate streaming without downloading the whole file).

### 2. Code Execution & Rendering
- **Fixed Hooks-in-Loop Violation**: Refactored `Projects.tsx` to extract a `<ProjectCard>` component. Previously, `useRef` and `useScroll` were being called inside a `.map()` loop, which violates React's Rules of Hooks and causes silent re-renders and performance leaks.
- **Lazy Loading Heavy Components**: Used `next/dynamic` to lazy-load the `ProjectVideoModal` component (~34 KB). It is now only downloaded by the browser when the user actually clicks the "Watch Demo" button, rather than blocking the initial page load.

### 3. Server & CSS Enhancements
- **Next.js Configuration**: Updated `next.config.ts` to enable `compress: true` (Gzip/Brotli compression for all assets), added long-lived cache headers for static files, and implemented security headers.
- **GPU Acceleration & Graceful Degradation**: Updated `globals.css` to add `will-change: transform` to parallax elements, allowing the browser to hardware-accelerate them. Also gated the highly expensive `backdrop-filter: blur(16px)` behind `@supports` to ensure smooth scrolling on low-end devices.

---

## ⏳ To Be Done (Next Steps)

### 1. Finalize Video Replacements
- Re-encode the final video (`coconutguard-video.mp4`).
- Swap the original massive `.mp4` files in the `public/` directory with the newly optimized versions and update the references in `src/data/projects.ts`.

### 2. Architecture Overhaul (SSR & RSC)
- **Remove Global Client Boundary**: Currently, `src/app/page.tsx` starts with `"use client"`, which forces the entire page and all its sections to be Client Components. This harms Time to First Byte (TTFB), SEO, and initial load speed.
- **Server Components**: Convert static sections (`About`, `Skills`, `Experience`, `Testimonials`) into pure React Server Components (RSC) so their HTML is pre-rendered on the server and ships zero JavaScript to the client.
- **Dynamic Imports**: Use `next/dynamic` to selectively load interactive sections (`Hero`, `Projects`, `Contact`) only when needed on the client side.

### 3. Final Bundle Analysis
- Run `npx @next/bundle-analyzer` and Lighthouse audits to verify the final bundle size, LCP, and TBT (Total Blocking Time) scores once all changes are integrated.
