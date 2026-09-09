export interface ExperienceProject {
    name: string;
    category?: string;
    tech?: string[];
    highlights: string[];
}

export interface ExperienceItem {
    type: "work" | "education";
    title: string;
    organization: string;
    duration: string;
    projects?: ExperienceProject[];
    highlights?: string[];
}

export const experienceData: ExperienceItem[] = [
    {
        type: "work",
        title: "Trainee Software Engineer",
        organization: "Airport and Aviation Services (Sri Lanka) (Private) Limited",
        duration: "July 2024 – Dec 2024",
        projects: [
            {
                name: "Employee Connect Mobile App",
                category: "Employee Data Management System",
                tech: ["Flutter", "Dart", "SQLite", "AES Encryption", "Provider"],
                highlights: [
                    "Architected Android app for managing employee and family records efficiently.",
                    "Implemented local SQLite storage with secure import/export and AES offline license activation.",
                    "Added aid-tracking filters and automated PDF report generation.",
                ],
            },
            {
                name: "CCTV Operator View Website",
                category: "Real-Time Surveillance Dashboard",
                tech: ["React.js", "Lucide Icons", "CSS3", "React Hooks"],
                highlights: [
                    "Developed frontend for AASL Sri Lanka's real-time CCTV security monitoring system.",
                    "Built adjustable multi-camera display panels with dynamic data visualization.",
                    "Integrated live streaming dashboard with external data connections.",
                ],
            },
        ],
        highlights: [
            "Architected Employee Connect mobile app using Flutter, SQLite, and AES security.",
            "Developed real-time CCTV monitoring dashboard for AASL security using React.js.",
        ],
    },
    {
        type: "education",
        title: "BSc. (Hons) Software Engineering",
        organization: "The University of Plymouth, UK",
        duration: "June 2021 – Dec 2024",
        highlights: [
            "Second Class Honours (Upper Division)",
        ],
    },
];
