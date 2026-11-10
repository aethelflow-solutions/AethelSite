import type { Metadata } from "next";
import HomepageContent from "./HomepageContent";

export const metadata: Metadata = {
  title:
    "Aethel Flow | AI & Automation Solutions, Custom Software & Digital Transformation",
  description:
    "Aethel Flow harnesses AI and intelligent automation to streamline workflows, build scalable full-stack software, deploy conversational AI agents, and accelerate digital transformation across UAE, Saudi Arabia, Qatar, Kuwait, Bahrain, Oman, and India.",
  keywords: [
    "Aethel Flow",
    "Aethel Flow Solutions",
    "AI & Automations",
    "Enterprise AI Solutions",
    "Workflow Automation",
    "Agent Call Services",
    "Conversational AI Agents",
    "Full Stack Software Development",
    "Digital Transformation Consulting",
    "Software Modernization",
    "Data Analytics and Business Intelligence",
    "AI Agency India",
    "AI Solutions Hyderabad",
    "AI Solutions UAE",
    "AI Automation Dubai",
    "AI Solutions Saudi Arabia",
    "AI Automation Riyadh",
    "AI Solutions Qatar",
    "AI Solutions Kuwait",
    "AI Solutions Bahrain",
    "AI Solutions Oman",
  ],
  alternates: {
    canonical: "https://aethelflow.com",
    languages: {
      "x-default": "https://aethelflow.com",
      "en-US": "https://aethelflow.com",
      "en-IN": "https://aethelflow.com",
      "en-AE": "https://aethelflow.com",
      "en-SA": "https://aethelflow.com",
      "en-QA": "https://aethelflow.com",
      "en-KW": "https://aethelflow.com",
      "en-BH": "https://aethelflow.com",
      "en-OM": "https://aethelflow.com",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title:
      "Aethel Flow | AI & Automation Solutions, Custom Software & Digital Transformation",
    description:
      "Supercharge your operations with AI that delivers seamless automation, custom full-stack software, and intelligent agent call services.",
    url: "https://aethelflow.com",
    siteName: "Aethel Flow",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://aethelflow.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Aethel Flow - AI & Automation Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Aethel Flow | AI & Automation Solutions, Custom Software & Digital Transformation",
    description:
      "Supercharge your operations with AI that delivers seamless automation, custom full-stack software, and intelligent agent call services.",
    images: ["https://aethelflow.com/og-image.png"],
  },
};

/**
 * SEO + AEO (Answer Engine Optimization) Structured Data Graph
 */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://aethelflow.com/#organization",
      name: "Aethel Flow Solutions Pvt. Ltd.",
      alternateName: "Aethel Flow",
      url: "https://aethelflow.com",
      logo: "https://aethelflow.com/logo.png",
      image: "https://aethelflow.com/og-image.png",
      description:
        "Aethel Flow Solutions Pvt. Ltd. is an AI and automation technology company specializing in custom AI/ML models, workflow automation, conversational AI voice & chat agents, full-stack software development, data analytics, and digital transformation consulting.",
      email: "contact@aethelflow.com",
      telephone: "+91-7416656592",
      knowsAbout: [
        "Artificial Intelligence",
        "Business Process Automation",
        "Conversational AI Agents",
        "Agent Call Services",
        "Full Stack Software Development",
        "Digital Transformation Consulting",
        "Legacy Software Modernization",
        "Data Analytics and Business Intelligence",
      ],
      areaServed: [
        { "@type": "Country", name: "United Arab Emirates" },
        { "@type": "Country", name: "Saudi Arabia" },
        { "@type": "Country", name: "Qatar" },
        { "@type": "Country", name: "Kuwait" },
        { "@type": "Country", name: "Bahrain" },
        { "@type": "Country", name: "Oman" },
        { "@type": "Country", name: "India" },
        { "@type": "Country", name: "United States" },
      ],
      address: {
        "@type": "PostalAddress",
        streetAddress:
          "9-4-136/19,20 & 21/A, Shareef Residency, 3rd Floor, 7 Tombs Road, Tolichowki",
        addressLocality: "Hyderabad",
        addressRegion: "Telangana",
        addressCountry: "IN",
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Aethel Flow AI & Software Services",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "AI & Automations",
              description:
                "Design and deploy AI/ML models for workflow automation, predictive analytics, and intelligent decision-making.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Full Stack Solutions",
              description:
                "End-to-end web, mobile, and cloud software engineering powered by modern scalable architectures.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Agent Call Services",
              description:
                "Intelligent AI voice and call agents for personalized, 24/7 customer communication, lead qualification, and support.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Digital Transformation Consulting",
              description:
                "Strategic consulting to help enterprises adopt and optimize digital and AI technologies across operations.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Software Development and Modernization",
              description:
                "Architecting, engineering, and modernizing legacy enterprise software to modern cloud-native platforms.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Data Analytics and Business Intelligence",
              description:
                "Data strategy, governance, advanced analytics, and actionable BI dashboards for data-driven decision-making.",
            },
          },
        ],
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://aethelflow.com/#website",
      url: "https://aethelflow.com",
      name: "Aethel Flow",
      publisher: {
        "@id": "https://aethelflow.com/#organization",
      },
    },
    {
      "@type": "WebPage",
      "@id": "https://aethelflow.com/#webpage",
      url: "https://aethelflow.com",
      name: "Aethel Flow - AI & Automation Solutions",
      isPartOf: {
        "@id": "https://aethelflow.com/#website",
      },
      about: {
        "@id": "https://aethelflow.com/#organization",
      },
      description:
        "At Aethel Flow, we harness AI and automation to streamline workflows, spark innovation, and empower businesses to move faster with seamless, intelligent solutions.",
    },
    {
      "@type": "FAQPage",
      "@id": "https://aethelflow.com/#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "What services does Aethel Flow offer?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Aethel Flow offers AI & Automations (custom AI/ML models and workflow automation), Full Stack Software Solutions, AI Agent Call Services, Digital Transformation Consulting, Legacy Software Modernization, and Data Analytics & Business Intelligence.",
          },
        },
        {
          "@type": "Question",
          name: "Which regions and countries does Aethel Flow serve?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Aethel Flow serves enterprises globally with a strong focus on the Gulf (GCC) countries — United Arab Emirates (Dubai, Abu Dhabi), Saudi Arabia (Riyadh, Jeddah), Qatar (Doha), Kuwait, Bahrain, and Oman — as well as India and North America.",
          },
        },
        {
          "@type": "Question",
          name: "How can AI and automation from Aethel Flow help my business?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Aethel Flow streamlines repetitive workflows, deploys 24/7 conversational AI chat and voice call agents, modernizes legacy software, and unlocks predictive data insights to reduce operational costs and accelerate growth.",
          },
        },
        {
          "@type": "Question",
          name: "How can I contact Aethel Flow or book a consultation?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "You can book a consultation through the Contact form on https://aethelflow.com/#contact, chat with the Aethel Flow AI Assistant on the website, email contact@aethelflow.com, or call +91 7416656592.",
          },
        },
      ],
    },
  ],
};

export default function Home() {
  return (
    <main className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomepageContent />
    </main>
  );
}
