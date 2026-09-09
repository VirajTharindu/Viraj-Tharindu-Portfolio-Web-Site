import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const BASE_URL = "https://vjstyles.dev";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: "Viraj Tharindu — Full-Stack Software Engineer",
  description:
    "Full-stack software engineer from Sri Lanka building scalable web systems. Explore my portfolio of production-grade projects in React, Next.js, Node.js, TypeScript, and PostgreSQL.",
  keywords: [
    "Viraj Tharindu",
    "Viraj Tharindu portfolio",
    "software engineer Sri Lanka",
    "full-stack developer Sri Lanka",
    "full-stack software engineer",
    "React developer",
    "Next.js developer",
    "Node.js developer",
    "TypeScript developer",
    "PostgreSQL developer",
    "ERP system developer",
    "web developer portfolio",
    "CoconutGuard",
    "RetailSphere",
  ],
  authors: [{ name: "Viraj Tharindu", url: BASE_URL }],
  creator: "Viraj Tharindu",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: "/apple-icon.svg",
  },
  openGraph: {
    title: "Viraj Tharindu — Full-Stack Software Engineer",
    description:
      "Full-stack software engineer from Sri Lanka building scalable web systems. React · Next.js · Node.js · TypeScript · PostgreSQL.",
    url: BASE_URL,
    siteName: "Viraj Tharindu Portfolio",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Viraj Tharindu — Full-Stack Software Engineer",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Viraj Tharindu — Full-Stack Software Engineer",
    description:
      "Full-stack software engineer from Sri Lanka building scalable web systems.",
    images: ["/og-image.jpg"],
    creator: "@VirajTharindu",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

import JsonLd from "@/components/JsonLd";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('theme');
                  if (saved === 'dark' || saved === 'light') {
                    document.documentElement.setAttribute('data-theme', saved);
                  } else {
                    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                    var theme = prefersDark ? 'dark' : 'light';
                    document.documentElement.setAttribute('data-theme', theme);
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <JsonLd />
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
