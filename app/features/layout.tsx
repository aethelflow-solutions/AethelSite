import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Features | Scalable Architecture, Enterprise Security & Fast Deployment",
  description:
    "Explore Aethel Flow's core platform features: scalable cloud architecture, industry-grade enterprise security, rapid agile deployment, and 24/7 dedicated support.",
  keywords: [
    "Aethel Flow Features",
    "Scalable AI Architecture",
    "Enterprise AI Security",
    "Fast Software Deployment",
    "Dedicated Tech Support",
    "Custom AI Solutions",
    "Enterprise Automation Platform",
  ],
  alternates: {
    canonical: "https://aethelflow.com/features",
    languages: {
      "x-default": "https://aethelflow.com/features",
      "en-US": "https://aethelflow.com/features",
      "en-IN": "https://aethelflow.com/features",
      "en-AE": "https://aethelflow.com/features",
      "en-SA": "https://aethelflow.com/features",
      "en-QA": "https://aethelflow.com/features",
      "en-KW": "https://aethelflow.com/features",
      "en-BH": "https://aethelflow.com/features",
      "en-OM": "https://aethelflow.com/features",
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
    title: "Features | Aethel Flow - Scalable & Secure AI Solutions",
    description:
      "Embrace the future with Aethel Flow. We deliver scalable, enterprise-secure, and rapidly deployed AI & software solutions tailored to your business.",
    url: "https://aethelflow.com/features",
    siteName: "Aethel Flow",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://aethelflow.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Aethel Flow Features - Scalable & Secure AI Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Features | Aethel Flow - Scalable & Secure AI Solutions",
    description:
      "Embrace the future with Aethel Flow. We deliver scalable, enterprise-secure, and rapidly deployed AI & software solutions tailored to your business.",
    images: ["https://aethelflow.com/og-image.png"],
  },
};

const featuresJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://aethelflow.com/features#webpage",
  url: "https://aethelflow.com/features",
  name: "Features | Aethel Flow",
  description:
    "Scalable architecture, enterprise security, fast deployment, and dedicated support tailored to your enterprise needs.",
  mainEntity: {
    "@type": "ItemList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Scalable Architecture",
        description:
          "Our systems grow with your business without performance issues.",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Enterprise Security",
        description:
          "We follow industry-grade security standards to protect data.",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Easy And Fast Deployment",
        description: "Agile process ensures faster delivery and iterations.",
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Dedicated Support",
        description:
          "Our team is always available for assistance and maintenance.",
      },
    ],
  },
};

export default function FeatureLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(featuresJsonLd) }}
      />
      <div className="bg-white sm:p-2 lg:p-4">
        <Navbar />
        {children}
        <Footer />
      </div>
    </>
  );
}
