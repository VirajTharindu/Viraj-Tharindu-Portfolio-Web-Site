# Performance & Speed Improvement Plan — Viraj Tharindu Portfolio

A full audit of the codebase identified several high-impact bottlenecks. Issues are grouped by severity and area.

---

## 🔴 Critical Issues (Biggest Impact)

### 1. Gigantic Uncompressed Video Files (~350 MB served raw)

| File | Size |
|---|---|
| `Suriya-video.mp4` | **154 MB** |
| `supermarket-video.mp4` | **108 MB** |
| `coconutguard-video.mp4` | **71 MB** |

These are served directly from `/public` with zero compression or streaming optimization. A first-time visitor will attempt to download **333 MB** before the video previews work.

**Fix:**
- Re-encode all three with `ffmpeg` using H.264 (CRF 28, `web` preset) and target ≤ 10 MB each
- Add `preload="none"` / `preload="metadata"` so they don't eagerly load
- Add `poster` image so the frame shows immediately with zero download

---

### 2. Uncompressed PNG Images (~23 MB)

| File | Size |
|---|---|
| `profile_main.png` | **11.2 MB** |
| `working.png` | **11.0 MB** |

These are served as raw PNG to every visitor on every load.

**Fix:**
- Convert to WebP with quality 80 → expect **≥ 80% size reduction**
- Use Next.js `<Image>` component instead of `<img>` — this enables automatic optimization, responsive `srcset`, and lazy loading for free

---

### 3. `useRef` / `useScroll` Called Inside `.map()` — Rules of Hooks Violation

In [`Projects.tsx`](file:///d:/Projects/Web%20Development2/Viraj-Tharindu-Portfolio-Web-Site/src/components/sections/Projects.tsx#L54-L63):

```tsx
{projects.map((project, i) => {
    // ⚠️ HOOKS INSIDE LOOPS — ILLEGAL
    const cardRef = useRef(null);
    const { scrollYProgress: cardScroll } = useScroll({ target: cardRef, ... });
    const xShift = useTransform(cardScroll, [0, 1], [...]);
```

React's rules of hooks prohibit calling hooks inside loops. This works by coincidence today but will cause subtle bugs as the project list changes, and silently re-creates scroll listeners on every render.

**Fix:** Extract each project card into its own `<ProjectCard />` component so the hooks run at the top level of that component.

---

## 🟠 High Impact Issues

### 4. Entire Page is a Client Component — No SSR / RSC

[`page.tsx`](file:///d:/Projects/Web%20Development2/Viraj-Tharindu-Portfolio-Web-Site/src/app/page.tsx#L1) starts with `"use client"`, making the entire page and all its children client-rendered. This:
- Increases Time to First Byte (TTFB)
- Prevents Next.js from pre-rendering any HTML for SEO crawlers
- Forces the browser to download and execute all JS before showing anything

**Fix:** Remove `"use client"` from `page.tsx`. Import heavy interactive sections (`Hero`, `Projects`, `Contact`) with `dynamic()` and the `ssr: false` flag only where truly needed, keeping static sections (`About`, `Skills`, `Experience`) as pure Server Components.

---

### 5. `ProjectVideoModal` Always Eagerly Loaded (34 KB component)

[`ProjectVideoModal.tsx`](file:///d:/Projects/Web%20Development2/Viraj-Tharindu-Portfolio-Web-Site/src/components/ui/ProjectVideoModal.tsx) is **34 KB** and imported statically at the top of `Projects.tsx`. It renders a full cinema-style player that the user only sees when they click "Watch Demo". It adds to the initial bundle for every page load.

**Fix:** Use `next/dynamic` with `{ ssr: false }` to lazy-load it only when opened.

---

### 6. No `next.config.ts` Optimizations

[`next.config.ts`](file:///d:/Projects/Web%20Development2/Viraj-Tharindu-Portfolio-Web-Site/next.config.ts) is nearly empty. Missing:
- `compress: true` — enables gzip/brotli for all served assets
- Image optimization domains / remote patterns
- Security/caching headers
- Bundle analysis configuration

---

### 7. Heavy `backdrop-filter: blur(16px)` on All Glass Cards

Every project card, nav, and section uses `backdrop-filter: blur(16px)`. This is the most GPU-expensive CSS property. On lower-end devices it causes frame drops on scroll.

**Fix:** Wrap the blur in `@media (prefers-reduced-motion: no-preference)` and `@supports (backdrop-filter: blur())`. Fall back to a solid semi-transparent background for devices that don't support it.

---

## 🟡 Medium Impact Issues

### 8. Plain `<img>` Tags Instead of `next/image`

Used in `Hero.tsx` (`profile_main.png` — 11 MB) and `Projects.tsx` (screenshots). `<img>` bypasses Next.js's built-in:
- WebP conversion
- Responsive `srcset`
- Automatic lazy loading
- Priority hinting

**Fix:** Replace all `<img>` with `<Image>` from `next/image`.

---

### 9. Framer Motion Full Bundle

`framer-motion` is imported wholesale. The full bundle is ~95 KB gzipped. For scroll animations you only need `motion`, `useScroll`, and `useTransform`.

**Fix:** Ensure only named imports are used (already the case in most files), and consider `m` (lazy) components from `framer-motion/m` where possible.

---

### 10. No Font Subsetting Beyond `latin`

Inter is loaded with only `subsets: ["latin"]` which is good, but `display: "swap"` is already set — this is fine. Just confirm no additional weight variants are being pulled in.

---

## 🟢 Quick Wins (Low Effort, Noticeable Gain)

| Item | What to do |
|---|---|
| `<video preload="none" poster="...">` | Stop pre-buffering 333 MB of video on page load |
| `loading="lazy"` on all below-fold `<img>` | Defer off-screen image decoding |
| `fetchpriority="high"` on hero image | Prioritize the LCP image |
| `will-change: transform` on parallax elements | GPU-layer promotion for smoother scrolling |
| Remove unused `working.png` from public | It's 11 MB and not referenced anywhere |

---

## Proposed Changes

### Phase 1 — Zero-risk quick wins (no refactoring)
#### [MODIFY] [`next.config.ts`](file:///d:/Projects/Web%20Development2/Viraj-Tharindu-Portfolio-Web-Site/next.config.ts)
- Add `compress: true`, security headers, and image optimization config

#### [MODIFY] [`Projects.tsx`](file:///d:/Projects/Web%20Development2/Viraj-Tharindu-Portfolio-Web-Site/src/components/sections/Projects.tsx)
- Lazy-load `ProjectVideoModal` with `dynamic()`
- Extract project card to `ProjectCard` component to fix hook-in-loop violation

#### [MODIFY] [`Hero.tsx`](file:///d:/Projects/Web%20Development2/Viraj-Tharindu-Portfolio-Web-Site/src/components/sections/Hero.tsx)
- Replace `<img>` with `next/image` `<Image>` for `profile_main.png`
- Add `priority` prop (hero image is the LCP element)

#### [MODIFY] [`globals.css`](file:///d:/Projects/Web%20Development2/Viraj-Tharindu-Portfolio-Web-Site/src/app/globals.css)
- Gate `backdrop-filter` behind `@supports` for graceful degradation
- Add `will-change: transform` to parallax/animated elements

### Phase 2 — Asset optimization (biggest payload reduction)
- **Re-encode videos** with `ffmpeg` (CRF 28) → ~10 MB each from 333 MB total
- **Convert PNGs to WebP** → ~23 MB → ~2-4 MB

### Phase 3 — Architecture (SSR + code splitting)
- Remove `"use client"` from `page.tsx`
- Convert static sections to Server Components
- Dynamic import interactive sections

---

## Verification Plan

### Automated
```powershell
# Bundle size analysis
npx @next/bundle-analyzer
# Lighthouse CLI
npx lighthouse http://localhost:3000 --view
```

### Manual
- Open DevTools → Network tab → reload page, note total transfer size (currently ~350 MB+ for videos alone)
- Check Lighthouse scores for Performance, LCP, TBT before and after
- Confirm no visual regressions on all sections

---

## Open Questions

> [!IMPORTANT]
> **Which phases do you want me to implement now?**
> - Phase 1 (code-level fixes, safe, no asset conversion) can be done immediately.
> - Phase 2 (video/image re-encoding) requires `ffmpeg` to be installed — do you have it, or want me to check?
> - Phase 3 (SSR refactor) is the most impactful for SEO but requires more careful testing.

> [!WARNING]
> The **hooks-in-loop** issue in `Projects.tsx` is a correctness bug, not just a performance issue. It should be fixed regardless of which other phases you proceed with.
