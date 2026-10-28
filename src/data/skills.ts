export interface Skill {
    name: string;
    icon: string;
    proof: string;
}

export interface SkillGroup {
    category: string;
    size: "lg" | "md";
    skills: Skill[];
}

export const skillGroups: SkillGroup[] = [
    {
        category: "Frontend",
        size: "lg",
        skills: [
            { name: "React.js", icon: "Monitor", proof: "Used in 3+ production apps" },
            { name: "Next.js (SSR)", icon: "Monitor", proof: "App Router, SSR, SSG & Server Actions" },
            { name: "Angular 17", icon: "Layers", proof: "Signals, standalone components & DI" },
            { name: "TypeScript / JavaScript", icon: "FileCode", proof: "Primary languages across all projects" },
            { name: "Tailwind CSS", icon: "Palette", proof: "Styled 3+ production interfaces" },
            { name: "Flutter", icon: "Smartphone", proof: "Offline-first cross-platform mobile apps" },
            { name: "Zustand / Redux", icon: "Zap", proof: "Decoupled & centralized state management" },
            { name: "Framer Motion / 3D", icon: "Sparkles", proof: "Three.js, R3F & interactive animations" },
        ],
    },
    {
        category: "Backend",
        size: "lg",
        skills: [
            { name: "Node.js / Express", icon: "Server", proof: "REST & WebSocket APIs in production" },
            { name: "Java 17 / Spring Boot", icon: "Cpu", proof: "Enterprise REST APIs & robust backend services" },
            { name: "RESTful APIs", icon: "GitBranch", proof: "Flexible, secure endpoint architecture" },
            { name: "GraphQL", icon: "GitBranch", proof: "Declarative schemas & flexible data queries" },
            { name: "WebSockets", icon: "Zap", proof: "Bi-directional real-time event streaming" },
            { name: "Stateless JWT / Auth", icon: "ShieldCheck", proof: "BCrypt, RBAC & token rotation" },
            { name: "TanStack Query", icon: "RefreshCw", proof: "Server-state caching & synchronisation" },
            { name: "Python", icon: "Terminal", proof: "Data pipelines, ML integration & scripts" },
        ],
    },
    {
        category: "Database",
        size: "md",
        skills: [
            { name: "PostgreSQL", icon: "Database", proof: "Primary relational DB across projects" },
            { name: "MySQL / Azure SQL", icon: "Database", proof: "Relational storage & transactional queries" },
            { name: "MongoDB", icon: "HardDrive", proof: "Document store for dynamic data" },
            { name: "Redis", icon: "Zap", proof: "In-memory caching & pub/sub messaging" },
            { name: "Supabase / Firebase", icon: "Database", proof: "Realtime cloud database & BaaS" },
        ],
    },
    {
        category: "ORM & Architecture",
        size: "md",
        skills: [
            { name: "Prisma", icon: "Layers", proof: "Type-safe ORM across SQL projects" },
            { name: "Sequelize", icon: "Layers", proof: "Relational ORM for Node.js" },
            { name: "Repository Pattern", icon: "Boxes", proof: "Decoupled data access & domain layers" },
            { name: "CSM Architecture", icon: "Layers", proof: "Clean service-module enterprise design" },
        ],
    },
    {
        category: "DevOps & Tools",
        size: "md",
        skills: [
            { name: "Docker", icon: "Container", proof: "Containerized environments & parity" },
            { name: "Git & GitHub Actions", icon: "GitBranch", proof: "CI/CD automated build & test pipelines" },
            { name: "Vercel / Cloud", icon: "Cloud", proof: "Production hosting & edge deployments" },
            { name: "Lighthouse & SEO", icon: "Gauge", proof: "Performance & Core Web Vitals optimization" },
        ],
    },
    {
        category: "Testing",
        size: "md",
        skills: [
            { name: "Vitest / Jest", icon: "CheckCircle2", proof: "Fast unit testing & component suites" },
            { name: "Playwright (E2E)", icon: "CheckCircle2", proof: "End-to-end multi-browser test suites" },
            { name: "Full-Stack Debugging", icon: "Wrench", proof: "Profiling, diagnostics & error tracking" },
            { name: "Agile / Scrum", icon: "Workflow", proof: "Sprint tracking, code reviews & Jira" },
        ],
    },
];
