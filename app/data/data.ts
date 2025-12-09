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
        title: "Full Stack Development",
        description: "Implement versatile professional capable of building complete web solutions from the user interface to the server and database, making them valuable for rapid and cohesive software development",
        icon: "../../static/Icon.png",
    },
    {
        id: 2,
        title: "AI & Automations",
        description: "Design and deploy AI/ML models for automation, predictive analytics, and intelligent decision-making.",
        icon: "../../static/Icon.png",
    },
    {
        id: 3,
        title: "Cloud Solutions",
        description: "Including cloud migration, hybrid cloud solutions, architecture development, and secure cloud management",
        icon: "../../static/Icon.png",
    },
    {
        id: 4,
        title: "Data Analytics",
        description: "Providing data strategy, governance, advanced analytics, and actionable insights for data-driven decision-making.",
        icon: "../../static/Icon.png",
    },
    {
        id: 5,
        title: "Cybersecurity",
        description: "Implement zero-trust frameworks, automated compliance monitoring, risk management, and fraud detection strategies.",
        icon: "../../static/Icon.png",
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
