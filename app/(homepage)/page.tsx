import type { Metadata } from "next";
import HomepageContent from "./HomepageContent";

export const metadata: Metadata = {
  title:
    "Aethel Flow | AI & Automation Solutions, Custom Software & Digital Transformation",
  description:
    "Aethel Flow harnesses AI and intelligent automation to streamline workflows, build scalable full-stack software, deploy conversational AI agents, and accelerate digital transformation.",
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
  ],
  alternates: {
    canonical: "https://aethelflow.com",
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
        "Aethel Flow harnesses AI and automation to streamline workflows, spark innovation, and empower businesses with seamless, intelligent solutions.",
      email: "contact@aethelflow.com",
      telephone: "+91-7416656592",
      address: {
        "@type": "PostalAddress",
        streetAddress:
          "9-4-136/19,20 & 21/A, Shareef Residency, 3rd Floor, 7 Tombs Road, Tolichowki",
        addressLocality: "Hyderabad",
        addressRegion: "Telangana",
        addressCountry: "IN",
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
