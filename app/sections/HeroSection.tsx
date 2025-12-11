"use client";

import { useCallback } from "react";
import { Typography } from "@mui/material";
import AButton from "../components/AButton";

function scrollToSection(sectionId: string): void {
  const element = document.getElementById(sectionId);
  element?.scrollIntoView({ behavior: "smooth" });
}

export default function HeroSection() {
  const handleContactClick = useCallback(() => {
    scrollToSection("contact");
  }, []);

  return (
    <section
      id="home"
      className="relative flex items-center min-h-screen text-white pt-32 pb-28 px-6 rounded-3xl overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/bg1.jpg')" }}
      aria-label="Hero section"
    >
      <div className="w-full flex flex-col items-start justify-center gap-6 max-w-3xl mx-auto text-left ml-10">
        <Typography
          component="h1"
          variant="h3"
          className="font-bold leading-tight heroTitle"
          sx={{ fontSize: { xs: "26px", md: "34px" } }}
        >
          Supercharge your operations with AI that delivers seamless automation
        </Typography>

        <Typography
          component="p"
          variant="body1"
          className="leading-relaxed animate-fadeIn"
          sx={{ fontSize: { xs: "14px", md: "17px" } }}
        >
          At Aethel Flow, we harness AI and automation to streamline workflows,
          spark innovation, and empower businesses to move faster with seamless,
          intelligent solutions for a future that flows effortlessly.
        </Typography>

        <div className="mt-4">
          <AButton
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
          </AButton>
        </div>
      </div>
    </section>
  );
}
