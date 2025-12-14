"use client";

import dynamic from "next/dynamic";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HeroSection from "../sections/HeroSection";
import StickyContact from "../components/stickyContact"

// Lazy load sections below the fold for better performance
const Services = dynamic(() => import("../sections/Services"), {
  loading: () => <div className="min-h-[50vh]" />,
});

const MissionSection = dynamic(() => import("../sections/MissionSection"), {
  loading: () => <div className="min-h-[50vh]" />,
});

const ContactSection = dynamic(() => import("../sections/ContactSection"), {
  loading: () => <div className="min-h-[50vh]" />,
});

export default function HomepageContent() {
  return (
    <>
      <Navbar />
      <div className="mx-auto bg-white">
        <div className="sm:p-2 lg:p-4">
          <HeroSection />
        </div>
        <Services />
        <div className="sm:p-4 lg:p-8">
          <MissionSection />
        </div>
        <ContactSection />
        <Footer />
      </div>
      <StickyContact />
    </>
  );
}
