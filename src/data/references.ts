export interface Reference {
    name: string;
    title: string;
    organization: string;
    phone: string;
    email: string;
    relationship?: string;
}

export const referencesData: Reference[] = [
    {
        name: "N D D Nandasena",
        title: "Assistant Systems Engineer",
        organization: "Airport and Aviation Services (Sri Lanka) (Private) Limited",
        phone: "+94 77 339 6129",
        email: "dinusha.it@airport.lk",
        relationship: "Industry Supervisor",
    },
];
