import { Github, Linkedin, Mail, Heart } from "lucide-react";

import { USER_LINKEDIN_URL } from "@/data/testimonials";


const socialLinks = [
    { icon: Github, href: "https://github.com/VirajTharindu", label: "GitHub" },
    { icon: Linkedin, href: USER_LINKEDIN_URL, label: "LinkedIn" },
    { icon: Mail, href: "mailto:virajtharindu1997@gmail.com", label: "Email" },
];

export default function Footer() {
    return (
        <footer className="border-t border-border bg-surface/50">
            <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 py-12 md:flex-row md:justify-between md:px-8">
                <div className="flex items-center gap-2 text-sm text-muted">
                    <span>© {new Date().getFullYear()} VIRAJ THARINDU. Built with</span>
                    <Heart size={14} className="text-primary" fill="currentColor" />
                    <span>and Next.js</span>
                </div>
                <div className="flex items-center gap-4">
                  {socialLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.label}
                      className="rounded-lg p-2 text-muted transition-colors hover:bg-surface-light hover:text-primary"
                    >
                      <link.icon size={20} />
                    </a>
                  ))}
                </div>
            </div>

        </footer>
    );
}
