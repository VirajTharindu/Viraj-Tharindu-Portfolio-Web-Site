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
            { name: "JavaScript", icon: "Code", proof: "Created more than 3+ projects" },
            { name: "TypeScript", icon: "FileCode", proof: "Primary language across all projects" },
            { name: "Tailwind CSS", icon: "Palette", proof: "Styled 3+ production interfaces" },
            { name: "Zustand", icon: "zap", proof: "State management for 3+ projects" },
            { name: "Context API", icon: "layers", proof: "State management for 3+ projects" },
            { name: "Redux Toolkit", icon: "layers", proof: "State management for 3+ projects" },
            { name: "Framer Motion", icon: "Sparkles", proof: "Interactive animations & transitions" },
            { name: "GSAP", icon: "Sparkles", proof: "Used in a 3D project" },
            { name: "D3JS", icon: "Sparkles", proof: "Used in data visualization" },
            { name: "ThreeJS", icon: "Sparkles", proof: "Used in a 3D project" },
            { name: "ReactThreeFiber", icon: "Sparkles", proof: "Used in a 3D project" },
            { name: "HTML", icon: "Terminal", proof: "Used in all projects" },
            { name: "CSS", icon: "Terminal", proof: "Used in all projects" },

        ],
    },
    {
        category: "Backend",
        size: "lg",
        skills: [
            { name: "Next.js", icon: "Monitor", proof: "Used in 3+ production apps" },
            { name: "Node.js / Express", icon: "Server", proof: "REST & WebSocket APIs in production" },
            { name: "Rest API", icon: "GitBranch", proof: "Flexible API layer for dashboards" },
            { name: "GraphQL", icon: "GitBranch", proof: "Flexible API layer for dashboards" },
            { name: "TanStack Query", icon: "GitBranch", proof: "Server side data fetching" },
            { name: "Websockets", icon: "GitBranch", proof: "Flexible API layer for dashboards" },

            //{ name: "Mongoose", icon: "Database", proof: "Flexible ORM across projects" },



        ],
    },
    {
        category: "Database",
        size: "md",
        skills: [
            { name: "PostgreSQL", icon: "Database", proof: "Primary relational DB across projects" },
            { name: "Supabase", icon: "Database", proof: "Primary cloud-based relational DB across projects" },
            { name: "Firebase", icon: "Database", proof: "Primary backend-as-a-service DB across projects" },
            { name: "MySQL", icon: "Database", proof: "Primary relational DB across projects" },
            { name: "MS SQL Server", icon: "Database", proof: "Primary relational DB across projects" },
            { name: "SQLite", icon: "Database", proof: "Primary relational DB across projects" },
            { name: "MongoDB", icon: "HardDrive", proof: "Document store for data" },
            { name: "Redis", icon: "Zap", proof: "Caching & pub/sub in E-Commerce Furniture App" },
        ],
    },


    {
        category: "ORM",
        size: "md",
        skills: [
            { name: "Prisma", icon: "Database", proof: "Flexible ORM across projects" },
            { name: "Sequelize", icon: "Database", proof: "Flexible ORM across projects" },
            { name: "Mongoose", icon: "Database", proof: "Flexible ODM across No-SQL projects" },
        ],
    },

    {
        category: "DevOps & Tools",
        size: "md",
        skills: [
            { name: "Docker", icon: "Container", proof: "Containerized all deployments" },
            { name: "Git / GitHub/ Github Actions", icon: "GitBranch", proof: "Version control across all projects" },
            { name: "CI/CD", icon: "RefreshCw", proof: "GitHub Actions pipelines" },
            { name: "Vercel/ Netlify/ Render", icon: "Terminal", proof: "Deployment and Hosting" },
            { name: "Lighthouse", icon: "Sparkles", proof: "Web performance optimization" },


        ],
    },

    {
        category: "Testing",
        size: "md",
        skills: [
            { name: "Vitest", icon: "Layers", proof: "Unit testing in projects" },
            { name: "React Testing Library", icon: "Sparkles", proof: "Component testing in 3+ projects" },
            { name: "Jest", icon: "Sparkles", proof: "Unit testing in 3+ projects" },
            { name: "Playwright", icon: "Sparkles", proof: "E2E testing in 3+ projects" },


        ],
    }
];
