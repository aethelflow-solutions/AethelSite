"use client";

import { Typography } from "@mui/material";
import TextType from "../../components/react-bits/TextType";

// function scrollToSection(sectionId: string): void {
//   const element = document.getElementById(sectionId);
//   element?.scrollIntoView({ behavior: "smooth" });
// }

export default function HeroSection() {
  
  
  

  return (
    <section
      id="home"
      className="relative flex items-center min-h-screen text-white pt-32 pb-28 px-6 rounded-3xl overflow-hidden"
      aria-label="Hero section"
    >
      {/* VIDEO BACKGROUND */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/bg2.mp4" type="video/mp4" />
      </video>

      {/* DARK OVERLAY (for text readability) */}
      <div className="absolute inset-0 bg-[#000000ad]"></div>

      {/* CONTENT */}
      <div className="relative w-full flex flex-col items-start justify-center gap-6 max-w-3xl mx-auto text-left ml-10">
        <TextType
          
          text={[
            "Supercharge your Operations with AI that delivers seamless Automation",
            "Transform workflows with AI-powered automation that works",
            "Elevate your business with intelligent automation solutions",
            "Automate smarter, scale faster with AI-driven innovation",
            "Streamline operations with AI that adapts to your needs",
            "Unlock efficiency through intelligent automation and AI",
            "Power your business with seamless AI automation",
            "Accelerate growth with intelligent workflow automation",
            "Empower your team with AI that automates complexity",
            "Drive innovation with AI-powered operational excellence"
,
          ]}
          typingSpeed={80}
          pauseDuration={5200}
          showCursor={false}
          startOnVisible={false}
          reverseMode={false}
          loop = {true}
          className="text-4xl heroTitle smooth-type"
          
        />

        <Typography
          component="p"
          variant="body1"
          className="leading-relaxed animate-fadeIn"
          sx={{ fontSize: { xs: "14px", md: "18px" } , color: "#cdfdff"}}
        >
          At Aethel Flow
          , we harness AI and automation to streamline workflows, spark
          innovation, and empower businesses to move faster with seamless,
          intelligent solutions for a future that flows effortlessly.
        </Typography>
        <div className="mt-4">
          {/* <AButton
            variant="outlined"
            onClick={handleContactClick}
            sx={{
              color: "white",
              border: "none",
              backgroundColor: "#692ac8",
              borderRadius: "50px",
              paddingX: 5,
              paddingY: 2.5,
              textTransform: "none",
              fontSize: "16px",
              "&:hover": {
                backgroundColor: "#5a24a8",
              },
            }}
          >
            Contact Us
          </AButton> */}
        </div>
      </div>
    </section>
  );
}
