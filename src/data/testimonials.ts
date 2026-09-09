export interface Testimonial {
    id: string;
    name: string;
    role: string;
    organization: string;
    relationship: string;
    date: string;
    verified: boolean;
    linkedinUrl: string;
    avatarInitials: string;
    image?: string;
    quote: string;
}

// Update this with your exact LinkedIn profile link
export const USER_LINKEDIN_URL = "https://www.linkedin.com/in/viraj-tharindu/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BRk5djzA%2BQnqAQzbfxWfLLg%3D%3D";

export const testimonials: Testimonial[] = [
    {
        id: "gayan-perera",
        name: "Mr. Gayan Perera",
        role: "Lecturer | Data Analyst | Faculty Coordinator (Australian Degree Programs)",
        organization: "Faculty of Computing, NSBM Green University",
        relationship: "Academic Supervisor & Mentor",
        date: "March 27, 2025",
        verified: true,
        linkedinUrl: USER_LINKEDIN_URL,
        avatarInitials: "GP",
        image: "/gayan-sir.jpeg",
        quote:
            "I had the opportunity to supervise Mr. Viraj during his academic work at NSBM Green University. He has shown steady commitment to his studies and carried out his responsibilities under my guidance. I wish him the best in his future endeavors.",
    },
];
