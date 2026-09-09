# SEO & Indexing Improvement Plan
### Viraj Tharindu Portfolio — Vercel Free Tier Deployment

---

## Current SEO Audit

| Item | Status | Notes |
|---|---|---|
| `<title>` tag | ✅ Good | Set in `layout.tsx` |
| Meta description | ✅ Good | Set in `layout.tsx` |
| Open Graph tags | ✅ Good | Title, description, URL set |
| Twitter Card | ✅ Good | `summary_large_image` configured |
| `robots.txt` | ✅ Good | Auto-generated via `robots.ts` |
| `sitemap.xml` | ⚠️ Minimal | Only root URL, no project entries |
| JSON-LD (Structured Data) | ✅ Exists | `Person` schema, good base |
| OG Image | ❌ Missing | No `og:image` — critical for link previews |
| `canonical` tag | ❌ Missing | Without it, duplicate URLs may be indexed |
| `lang` attribute | ✅ Good | `<html lang="en">` set |
| Page rendering | ⚠️ Client-side | `"use client"` on `page.tsx` hurts crawlability |
| Core Web Vitals | ⚠️ Needs work | LCP impacted by large images (being fixed) |
| Keyword depth | ⚠️ Thin | Generic; no location or niche specificity |

---

## Phase 1 — Fix Critical Technical Issues

> [!CAUTION]
> These are blockers. Search engines may not fully index or rank the site without them.

### 1.1 — Add an OG Social Preview Image

The most important missing piece. Without an `og:image`, link previews on LinkedIn, Twitter, WhatsApp, and Google show a blank card.

**Action:** Generate a 1200×630px branded OG image and add it to `layout.tsx`:

```tsx
// In src/app/layout.tsx
openGraph: {
    title: "Viraj Tharindu — Full-Stack Software Engineer",
    description: "...",
    url: "https://vjstyles.dev",
    siteName: "Viraj Tharindu Portfolio",
    images: [{
        url: "https://vjstyles.dev/og-image.png", // Add this file to /public
        width: 1200,
        height: 630,
        alt: "Viraj Tharindu — Software Engineer Portfolio",
    }],
    type: "website",
},
twitter: {
    card: "summary_large_image",
    images: ["https://vjstyles.dev/og-image.png"],
},
```

### 1.2 — Add a Canonical URL Tag

Prevents Google from indexing both `https://vjstyles.dev` and `https://www.vjstyles.dev` as separate pages.

```tsx
// In src/app/layout.tsx, inside metadata:
metadataBase: new URL("https://vjstyles.dev"),
alternates: {
    canonical: "/",
},
```

### 1.3 — Fix Page Rendering (Remove `"use client"` from `page.tsx`)

The entire page is currently client-rendered. Googlebot's crawler **can** execute JavaScript, but pre-rendered HTML is always more reliably indexed, especially for portfolio content that never changes dynamically.

**Action:** Remove `"use client"` from `src/app/page.tsx`. Wrap only the interactive parts (`Hero`, `Navbar`, `CommandPalette`) with `dynamic(..., { ssr: false })`. Static sections (`About`, `Skills`, `Experience`, `Testimonials`, `References`) become Server Components and ship pure HTML.

---

## Phase 2 — Enrich Structured Data (JSON-LD)

> [!IMPORTANT]
> Structured data powers Google's rich results (name panels, knowledge graphs, breadcrumbs). More schema = more surface area in search results.

### 2.1 — Expand `Person` Schema

Add the `image`, `email`, and `telephone` (optional) fields to your existing `JsonLd.tsx`:

```ts
"@type": "Person",
name: "Viraj Tharindu",
image: "https://vjstyles.dev/profile_main.png",
email: "mailto:your@email.com",
url: "https://vjstyles.dev",
```

### 2.2 — Add `SoftwareApplication` / `CreativeWork` Schema for Projects

Give each of your 3 projects their own `SoftwareApplication` schema block. This can appear in rich results.

```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "CoconutGuard",
  "applicationCategory": "WebApplication",
  "operatingSystem": "Web",
  "url": "https://coconutguard.netlify.app/",
  "author": { "@type": "Person", "name": "Viraj Tharindu" },
  "description": "AI-powered coconut disease detection system."
}
```

### 2.3 — Add `BreadcrumbList` Schema

Helps Google understand page structure and can generate breadcrumbs in search results.

---

## Phase 3 — Expand the Sitemap

The current `sitemap.ts` only lists the root URL. Expand it to include anchored sections so crawlers prioritize them:

```ts
// src/app/sitemap.ts
export default function sitemap(): MetadataRoute.Sitemap {
    const base = "https://vjstyles.dev";
    return [
        { url: base,                   lastModified: new Date(), priority: 1.0,  changeFrequency: "monthly" },
        { url: `${base}/#about`,        lastModified: new Date(), priority: 0.8,  changeFrequency: "yearly"  },
        { url: `${base}/#projects`,     lastModified: new Date(), priority: 0.9,  changeFrequency: "monthly" },
        { url: `${base}/#experience`,   lastModified: new Date(), priority: 0.7,  changeFrequency: "yearly"  },
        { url: `${base}/#skills`,       lastModified: new Date(), priority: 0.7,  changeFrequency: "yearly"  },
        { url: `${base}/#contact`,      lastModified: new Date(), priority: 0.6,  changeFrequency: "yearly"  },
        { url: `${base}/resume`,        lastModified: new Date(), priority: 0.8,  changeFrequency: "monthly" },
    ];
}
```

---

## Phase 4 — Keyword Strategy

The current keywords are generic (`software engineer`, `React`, `Next.js`). These are highly competitive global terms. Add **specific, lower-competition terms** that match how recruiters and clients actually search.

**Recommended additions:**
- `Viraj Tharindu portfolio` (brand name — own this SERP)
- `Sri Lanka software engineer`
- `full-stack developer Sri Lanka`
- `Next.js developer portfolio`
- `Node.js Express REST API developer`
- `PostgreSQL developer`
- `ERP system developer`
- `AI plant disease detection app`

Update `layout.tsx` keywords array and weave these naturally into your `About`, `Skills` and `Experience` section text content.

---

## Phase 5 — Off-Page SEO (Backlinks & Signals)

> [!NOTE]
> Google weights **who links to you** as heavily as your on-page content. A portfolio with zero backlinks ranks poorly even with perfect technical SEO.

### Priority Actions (Free)
1. **LinkedIn Profile** → Add your site URL in the "Website" field. LinkedIn has high domain authority — this is a free, trusted backlink.
2. **GitHub Profile README** → Add `https://vjstyles.dev` to your GitHub profile. GitHub's domain authority is excellent.
3. **Dev.to / Hashnode** → Publish 1–2 short articles about your projects (CoconutGuard, RetailSphere) with a link back to your portfolio. Technical blog posts can rank and drive traffic.
4. **Submit to Portfolio Directories:**
   - `https://www.polywork.com`
   - `https://peerlist.io`
   - `https://read.cv`
   - `https://contra.com`
5. **Google Search Console** → After deploying, submit your sitemap URL (`https://vjstyles.dev/sitemap.xml`) directly in GSC. This is the single most important indexing action.

---

## Phase 6 — Performance = SEO (Core Web Vitals)

Google's ranking algorithm directly uses Core Web Vitals. The performance fixes already done/in progress directly improve SEO:

| Metric | Target | Current Issue | Fix Applied |
|---|---|---|---|
| **LCP** (Largest Contentful Paint) | < 2.5s | 11 MB `profile_main.png` | ✅ `next/image` with `priority` |
| **CLS** (Cumulative Layout Shift) | < 0.1 | Images without dimensions | ✅ `fill` prop reserves space |
| **INP** (Interaction to Next Paint) | < 200ms | Hooks-in-loop, eager modals | ✅ `ProjectCard` extract + `dynamic()` |
| **FID / TBT** (Total Blocking Time) | < 300ms | Full client bundle on load | ⏳ SSR refactor (Phase 3) |

---

## Phase 7 — Vercel-Specific Setup

Vercel Free Tier gives you everything you need for great SEO — no paid plan required.

### 7.1 — Custom Domain
- Deploy with your custom domain `vjstyles.dev` (already referenced in metadata). Vercel provides free SSL automatically.
- In Vercel Dashboard → Settings → Domains → add `vjstyles.dev` and `www.vjstyles.dev`. Set a redirect so `www` → root.

### 7.2 — Vercel Speed Insights (Free)
Add the free speed insights package to monitor real-user Core Web Vitals:
```bash
npm install @vercel/speed-insights
```
```tsx
// In layout.tsx
import { SpeedInsights } from "@vercel/speed-insights/next";
// Add <SpeedInsights /> inside <body>
```

### 7.3 — Vercel Analytics (Free Tier)
```bash
npm install @vercel/analytics
```
```tsx
import { Analytics } from "@vercel/analytics/react";
// Add <Analytics /> inside <body>
```

---

## Implementation Priority Order

```
Week 1 (Highest ROI):
  1. Add og:image (1200×630 PNG to /public)
  2. Add canonical + metadataBase to layout.tsx
  3. Submit sitemap to Google Search Console
  4. Add LinkedIn + GitHub backlinks

Week 2:
  5. Expand sitemap.ts with section anchors
  6. Enrich JSON-LD with image + project schemas
  7. Add Vercel Analytics + Speed Insights
  8. Remove "use client" from page.tsx (SSR refactor)

Week 3+:
  9. Publish 1 technical article on Dev.to/Hashnode
  10. Submit to portfolio directories
  11. Monitor GSC for index coverage and CWV scores
```

---

> [!TIP]
> After deploying, use these free tools to verify everything is working:
> - **Google Search Console**: `search.google.com/search-console` — submit sitemap, check indexing
> - **Rich Results Test**: `search.google.com/test/rich-results` — validate JSON-LD
> - **PageSpeed Insights**: `pagespeed.web.dev` — check Core Web Vitals with real Vercel URL
> - **Open Graph Debugger**: `developers.facebook.com/tools/debug` — preview link share card
> - **Twitter Card Validator**: `cards-dev.twitter.com/validator`
