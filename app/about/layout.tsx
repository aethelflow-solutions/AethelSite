import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import StickyContact from "../components/stickyContact";

export const metadata: Metadata = {
  title: "About Us | Vision, Mission & AI Innovation",
  description:
    "Learn about Aethel Flow Solutions Pvt. Ltd. — our mission and vision to redefine the future of work through human-centric AI, intelligent automation, and scalable digital solutions.",
  keywords: [
    "About Aethel Flow",
    "Aethel Flow Solutions Pvt. Ltd.",
    "AI Automation Company",
    "Human-Centric AI",
    "Future of Work Automation",
    "Digital Transformation Partner",
    "AI Innovation Hyderabad",
  ],
  alternates: {
    canonical: "https://aethelflow.com/about",
    languages: {
      "x-default": "https://aethelflow.com/about",
      "en-US": "https://aethelflow.com/about",
      "en-IN": "https://aethelflow.com/about",
      "en-AE": "https://aethelflow.com/about",
      "en-SA": "https://aethelflow.com/about",
      "en-QA": "https://aethelflow.com/about",
      "en-KW": "https://aethelflow.com/about",
      "en-BH": "https://aethelflow.com/about",
      "en-OM": "https://aethelflow.com/about",
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
    title: "About Us | Aethel Flow - AI & Automation Solutions",
    description:
      "At Aethel Flow, we believe the future of work should be seamless, intelligent, and human-centric. Discover our story and vision.",
    url: "https://aethelflow.com/about",
    siteName: "Aethel Flow",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://aethelflow.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "About Aethel Flow - AI & Automation Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | Aethel Flow - AI & Automation Solutions",
    description:
      "At Aethel Flow, we believe the future of work should be seamless, intelligent, and human-centric. Discover our story and vision.",
    images: ["https://aethelflow.com/og-image.png"],
  },
};

const aboutJsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": "https://aethelflow.com/about#webpage",
  url: "https://aethelflow.com/about",
  name: "About Us | Aethel Flow",
  description:
    "At Aethel Flow, we believe the future of work should be seamless, intelligent, and human-centric, redefining automation with trust and clarity.",
  mainEntity: {
    "@type": "Organization",
    "@id": "https://aethelflow.com/#organization",
    name: "Aethel Flow Solutions Pvt. Ltd.",
    url: "https://aethelflow.com",
    logo: "https://aethelflow.com/logo.png",
    email: "contact@aethelflow.com",
    telephone: "+91-7416656592",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
      />
      <div className="bg-white sm:p-2 lg:p-4">
        <Navbar />
        {children}
        <StickyContact />
        <Footer />
      </div>
    </>
  );
}
