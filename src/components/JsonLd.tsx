import { skillGroups } from "@/data/skills";
import { experienceData } from "@/data/experience";
import { USER_LINKEDIN_URL } from "@/data/testimonials";

const BASE_URL = "https://vjstyles.dev";

export default function JsonLd() {
    const allSkills = skillGroups.flatMap((g) => g.skills.map((s) => s.name));

    const currentJob = experienceData.find(
        (e) => e.type === "work" && e.duration.includes("Present")
    );
    const education = experienceData.find((e) => e.type === "education");

    // ── Person schema ─────────────────────────────────────────────────────────
    const personSchema = {
        "@context": "https://schema.org",
        "@type": "Person",
        "@id": `${BASE_URL}/#person`,
        name: "Viraj Tharindu",
        url: BASE_URL,
        image: `${BASE_URL}/profile_main.png`,
        jobTitle: currentJob?.title || "Full-Stack Software Engineer",
        description:
            "Full-stack software engineer from Sri Lanka building scalable web systems. Experienced in React, Next.js, Node.js, TypeScript, and PostgreSQL.",
        worksFor: currentJob
            ? { "@type": "Organization", name: currentJob.organization }
            : undefined,
        alumniOf: education
            ? { "@type": "EducationalOrganization", name: education.organization }
            : undefined,
        knowsAbout: allSkills,
        nationality: {
            "@type": "Country",
            name: "Sri Lanka",
        },
        sameAs: [
            "https://github.com/VirajTharindu",
            USER_LINKEDIN_URL,
        ],
    };

    // ── Website schema ─────────────────────────────────────────────────────────
    const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": `${BASE_URL}/#website`,
        url: BASE_URL,
        name: "Viraj Tharindu — Portfolio",
        description: "Portfolio of Viraj Tharindu, full-stack software engineer.",
        author: { "@id": `${BASE_URL}/#person` },
    };

    // ── Project schemas ────────────────────────────────────────────────────────
    const projectSchemas = [
        {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "CoconutGuard",
            applicationCategory: "WebApplication",
            operatingSystem: "Web",
            url: "https://coconutguard.netlify.app/",
            author: { "@id": `${BASE_URL}/#person` },
            description:
                "AI-powered coconut disease detection system using deep learning for early identification of diseases via image analysis.",
            keywords: "AI, machine learning, plant disease detection, coconut, agriculture",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        },
        {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "RetailSphere — Supermarket ERP",
            applicationCategory: "BusinessApplication",
            operatingSystem: "Web",
            url: "https://retail-sphere-super-market-erp-syst.vercel.app/",
            author: { "@id": `${BASE_URL}/#person` },
            description:
                "Scalable, monorepo ERP system built on a clean CSM architecture with real-time Point-of-Sale terminal, procurement lifecycle, and analytics dashboard.",
            keywords: "ERP, POS, retail, supermarket, Node.js, TypeScript, PostgreSQL",
        },
        {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Suriya",
            applicationCategory: "WebApplication",
            operatingSystem: "Web",
            author: { "@id": `${BASE_URL}/#person` },
            description:
                "Full-stack web application developed with modern software engineering practices, secure authentication, and scalable REST API design.",
        },
    ];

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
            />
            {projectSchemas.map((schema) => (
                <script
                    key={schema.name}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
                />
            ))}
        </>
    );
}
