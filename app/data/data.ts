export interface CardData {
    id: number;
    title: string;
    description: string;
    icon: string;
    showButton?: boolean | false;
}

export const cardsData: CardData[] = [
    {
        id: 1,
        title: " AI & Automations",
        description: "Design and deploy AI/ML models for automation, predictive analytics, and intelligent decision-making.",
        icon: "/Send.webp",
    },
    {
        id: 2,
        title: "Full Stack Solutions",
        description: "Our company creates intelligent models of AI tech that utilize the power of advanced algorithms and strategic techniques.",
        icon: "/Send.webp",
    },
    {
        id: 3,
        title: "Agent Call Services",
        description: "Enable you to maintain personalized, efficient, and outcome-driven communication with customers, helping businesses optimize sales funnels, enhance support quality, and achieve operational goals.",
        icon: "/Send.webp",
    },
    {
        id: 4,
        title: "Digital Transformation Consulting",
        description: "Help businesses adopt and optimize digital technologies across all operations to improve efficiency and customer engagement.",
        icon: "/Send.webp",
    },
    {
        id: 5,
        title: "Software Development and Modernization",
        description: "Assist in architecting, engineering, and updating legacy software to modern platforms.",
        icon: "/Send.webp",
    },
      {
        id: 6,
        title: "Data Analytics and Business Intelligence",
        description: "Provide data strategy, governance, advanced analytics, and actionable insights for data-driven decision-making.",
        icon: "/Send.webp",
    },
];

export const aboutCardsData: CardData[] = [
    {
        id: 1,
        title: "Innovation First",
        description: "We leverage cutting-edge technologies to build innovative solutions that drive business growth and transformation.",
        icon: "../../static/AI.png",
    },
    {
        id: 2,
        title: "Customer Focused",
        description: "Our commitment is to deliver exceptional value and support every step of your digital journey.",
        icon: "../../static/AI.png",
        showButton: true,
    },
    {
        id: 3,
        title: "Expert Team",
        description: "With decades of combined experience, our team brings deep expertise across all technology domains.",
        icon: "../../static/AI.png",
    },
];
