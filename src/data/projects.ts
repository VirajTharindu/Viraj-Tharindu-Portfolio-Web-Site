export interface Project {
    title: string;
    description: string;
    problem: string;
    techStack: string[];
    features: string[];
    liveUrl?: string;
    githubUrl?: string;
    videoUrl?: string;
    videoBadge?: string;
    demoType?: "live" | "video";
    architectureHighlight: string;
    securityDetails?: string;
    screenshots?: string[];
    image: string;
}

export const projects: Project[] = [
    {
        title: "Kurunegala Furnitures",
        description:
            "🛋️ High-Performance 3D E-Commerce & Desktop Admin Portal — Bridging craftsmanship with WebGL innovation.",
        problem:
            "A full-stack, hybrid application designed to bring luxury furniture visualization into 3D. Features an interactive WebGL 3D configurator on the frontend, paired with a secure Electron.js desktop terminal for real-time management.",
        techStack: ["Next.js 16", "React Three Fiber", "Electron.js", "TypeScript", "Zustand", "Tailwind CSS", "Framer Motion", "GSAP"],
        features: [
            "Interactive 3D Configurator: Real-time WebGL product customization",
            "Room Visualizer: Dynamic environment placement using custom shaders",
            "Cross-Platform Hybrid Architecture: Unified Next.js codebase",
            "High-Fidelity Motion: Micro-interactions with Framer Motion and GSAP",
        ],
        liveUrl: "https://kurunegala-furnitures-furniture-sho.vercel.app/",
        githubUrl: "https://github.com/VirajTharindu/Kurunegala-Furnitures--Furniture-Shop-Page-NextJS-Fullstack--Admin-Dashboard-ElectronJS-Desktop.git",
        demoType: "live",
        architectureHighlight:
            "Engineered for Performance: Leveraged Zustand for zero-overhead state management to prevent 3D canvas re-renders, alongside custom Webpack bundle strategies.",
        securityDetails: "End-to-end encrypted local storage, secure Electron IPC bridging.",
        screenshots: ["/docs/screenshots/01-kurunegala-furnitures.png"],
        image: "/docs/screenshots/01-kurunegala-furnitures.png",
    },
    {
        title: "CoconutGuard: AI Agri-Tech",
        description:
            "A dual-platform microservices system to protect coconut yields. Features an offline-first Flutter mobile app running AI disease diagnostics.",
        problem:
            "Empowering farmers and aiming to save 30,000+ tons of coconuts annually through digitized field intelligence in remote areas with no connectivity.",
        techStack: ["Flutter", "Dart", "Next.js", "TypeScript", "Firebase", "TensorFlow Lite", "Hive NoSQL"],
        features: [
            "The Edge Unit: Flutter-based field app running local ML diagnostics",
            "The Command Center: Next.js dashboard for supply chain logistics",
            "Zero-Data-Loss Sync: Background sync engine using Hive and Firestore",
            "Enterprise Security: AES-ready local encryption and strict RBAC",
        ],
        videoUrl: "/coconutguard-video-opt.mp4",
        videoBadge: "Offline AI Diagnostics & Flutter Field System",
        demoType: "video",
        githubUrl: "https://github.com/VirajTharindu/CoconutGuard--Coconut-Supply-Chain-Management--Disease-Detection-Python-ML-Admin-Web-Employee-Mobile.git",
        architectureHighlight:
            "Asynchronous Fluidity: Strict non-blocking UI threads during heavy on-device ML inference for a zero-lag user experience.",
        securityDetails: "AES‑256 encryption for data at rest, RBAC with role‑based policies, secure Firebase rules.",
        screenshots: ["/docs/screenshots/02-coconutguard.png"],
        image: "/docs/screenshots/02-coconutguard.png",
        liveUrl: "https://coconutguard.netlify.app/",
    },
    {
        title: "Suriya: Trilingual Women's Health",
        description:
            "Digitizes the traditional Sri Lankan maternal 'Pink Book' and tracks vital signs using enterprise-grade security.",
        problem:
            "Solving the operational bottleneck of managing paper-based maternal and menstrual health records with a secure digital vault.",
        techStack: ["Next.js", "PostgreSQL", "Prisma", "TypeScript", "AES-256 Encryption"],
        features: [
            "Smart Networking: Leveraged Kruskal's Algorithm to connect clinics",
            "Intelligent Triage: Custom Priority Queues for medical alerts",
            "Ironclad Security: AES-256 encryption to lock down sensitive data",
            "Multilingual UI: Fully localized in English, Sinhala, and Tamil",
        ],
        videoUrl: "/Suriya-video-opt.mp4",
        videoBadge: "Maternal Health Vault & Kruskal Clinic Network",
        demoType: "video",
        liveUrl: "https://suriya-ochre.vercel.app/",
        githubUrl: "https://github.com/VirajTharindu/Surya-Women-s-Health-Tracing-and-Monitoring-System-Web-App-NextJS-FullStack.git",
        architectureHighlight:
            "Built on the Next.js App Router with a robust PostgreSQL/Prisma data layer, laying the groundwork for offline-ready PWA capabilities.",
        securityDetails: "AES‑256 encryption for all health data, role‑based access controls for clinicians.",
        screenshots: ["/docs/screenshots/03-suriya.png"],
        image: "/docs/screenshots/03-suriya.png",
    },
    {
        title: "RetailSphere: ERP & PoS System",
        description:
            "A full-stack retail ERP & PoS system tracking inventory, warning about expirations, and managing fast checkouts.",
        problem:
            "Designed to completely eliminate inventory leakage and streamline retail operations with proactive inventory forecasting and batch tracking.",
        techStack: ["React 18", "TypeScript", "Node.js", "Express", "MySQL", "Zod", "TailwindCSS"],
        features: [
            "Seamless PoS & Procurement: High-speed terminal linked to PO lifecycle",
            "Proactive Analytics: Smart dashboard pushing critical alerts",
            "Runtime Shielding: Integrated Zod for request payload validation",
            "Enterprise Security: Scalable, stateless JWT auth and RBAC",
        ],
        videoUrl: "/supermarket-video-opt.mp4",
        videoBadge: "Real-time PoS Terminal & Retail ERP Engine",
        demoType: "video",
        githubUrl: "https://github.com/VirajTharindu/RetailSphere--Super-Market-ERP-System-Web-App.git",
        architectureHighlight:
            "Highly scalable, monorepo ERP built on a clean Controller-Service-Model (CSM) layered architecture, decoupling business logic from the API layer.",
        securityDetails: "Stateless JWT authentication, RBAC middleware, encrypted DB columns.",
        screenshots: ["/docs/screenshots/04-retailsphere.png"],
        image: "/docs/screenshots/04-retailsphere.png",
        liveUrl: "https://retail-sphere-super-market-erp-syst.vercel.app/",
    },
];
