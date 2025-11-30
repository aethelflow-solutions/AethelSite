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
        description: "Design and deploy AI/ML models for automation, predictive analytics, and intelligent decision-making.",
        icon: "../../static/AI.png",
    },
    {
        id: 2,
        title: "AIOps & Automations",
        description: "Design and deploy AI/ML models for automation, predictive analytics, and intelligent decision-making.",
        icon: "../../static/AI.png",
    },
    {
        id: 3,
        title: "Cloud Solutions",
        description: "Design and deploy AI/ML models for automation, predictive analytics, and intelligent decision-making.",
        icon: "../../static/AI.png",
    },
    {
        id: 4,
        title: "Data Engineering",
        description: "Design and deploy AI/ML models for automation, predictive analytics, and intelligent decision-making.",
        icon: "../../static/AI.png",
    },
    {
        id: 5,
        title: "Data Engineering",
        description: "Design and deploy AI/ML models for automation, predictive analytics, and intelligent decision-making.",
        icon: "../../static/AI.png",
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
