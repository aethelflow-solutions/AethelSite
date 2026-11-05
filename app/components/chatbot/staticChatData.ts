import { ChatSession, Message } from "@/types/chat.type";

export const INITIAL_MESSAGES: Message[] = [
  {
    _id: "msg_1",
    role: "ai",
    content:
      "Hello! 👋 I’m the **Aethel Flow AI Assistant**. How can I help you streamline your workflows or explore our AI & automation solutions today?",
    timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    status: "completed",
    order: 1,
    metadata: {
      source: "welcome_greeting",
      model: "aethel-ai-v1",
    },
    tokenUsage: {
      input_tokens: 0,
      output_tokens: 32,
      total_tokens: 32,
    },
  },
  {
    _id: "msg_2",
    role: "human",
    content: "What services does Aethel Flow offer?",
    timestamp: new Date(Date.now() - 1000 * 60 * 4).toISOString(),
    status: "completed",
    order: 2,
  },
  {
    _id: "msg_3",
    role: "ai",
    content:
      "We specialize in end-to-end intelligent solutions tailored for modern enterprises:\n\n• **AI & Automations** – Custom AI/ML models & workflow automation\n• **Agent Call Services** – Smart voice & conversational AI agents\n• **Full Stack Solutions** – Scalable web, mobile & cloud architectures\n• **Digital Transformation** – Strategy, modernization & data analytics\n\nWould you like to dive deeper into any of these areas?",
    timestamp: new Date(Date.now() - 1000 * 60 * 4 + 4000).toISOString(),
    status: "completed",
    order: 3,
    metadata: {
      intent: "services_inquiry",
      confidence: 0.98,
    },
    tokenUsage: {
      input_tokens: 14,
      output_tokens: 78,
      total_tokens: 92,
    },
  },
];

export const INITIAL_CHAT_SESSION: ChatSession = {
  date: new Date(),
  deviceType: "desktop",
  title: "Aethel Flow AI Support",
  messages: INITIAL_MESSAGES,
  createdAt: new Date(Date.now() - 1000 * 60 * 5),
  updatedAt: new Date(),
};

export const QUICK_SUGGESTIONS: string[] = [
  "Tell me about AI & Automations",
  "How do Agent Call Services work?",
  "Book a consultation",
  "How can we contact your team?",
];

export const STATIC_BOT_REPLIES: Record<string, string> = {
  "Tell me about AI & Automations":
    "Our **AI & Automations** practice designs and deploys custom AI/ML models, intelligent document processing, and workflow bots that eliminate repetitive tasks and accelerate decision-making across your organization.",
  "How do Agent Call Services work?":
    "Our **Agent Call Services** combine conversational AI with outcome-driven communication to qualify leads, handle 24/7 customer support, automate follow-ups, and optimize your sales funnel seamlessly.",
  "Book a consultation":
    "You can schedule a consultation directly through our **Contact Us** section on the page, or share your email and requirements right here and our solutions architect will reach out to you!",
  "How can we contact your team?":
    "You can reach us anytime at **contact@aethelflow.com** or call **+91 7416656592**. We’re also available on WhatsApp via the quick contact button!",
};

export const DEFAULT_STATIC_REPLY =
  "Thanks for reaching out! Right now I'm running in preview mode with static data. Once the live API is connected, I'll provide real-time tailored answers for your query. In the meantime, feel free to explore our services or use the Contact form!";
