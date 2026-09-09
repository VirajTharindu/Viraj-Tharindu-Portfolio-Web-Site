"use client";

import dynamic from "next/dynamic";

// Dynamically load the actual Contact component with no SSR
const Contact = dynamic(() => import("@/components/sections/Contact"), { ssr: false });

export default function ContactWrapper() {
  return <Contact />;
}
