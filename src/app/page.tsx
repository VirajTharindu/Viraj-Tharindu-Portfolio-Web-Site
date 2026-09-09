import dynamic from "next/dynamic";
import ThemeProvider from "@/components/ThemeProvider";
import Footer from "@/components/Footer";

// ── Static sections — rendered as Server Components (zero JS to client) ──────
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import Testimonials from "@/components/sections/Testimonials";
import References from "@/components/sections/References";

// ── Interactive sections — client-side only, loaded dynamically ───────────────
import { Navbar, ScrollProgress, CommandPalette, Hero, Projects } from "@/components/sections/ClientComponents";
import Contact from "@/components/sections/ContactWrapper";

export default function Home() {
  return (
    <ThemeProvider>
      <ScrollProgress />
      <Navbar />
      <CommandPalette />
      <div className="noise-overlay" />
      <main>
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Skills />
        <Testimonials />
        <References />
        <Contact />
      </main>
      <Footer />
    </ThemeProvider>
  );
}
