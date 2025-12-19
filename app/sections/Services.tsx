"use client";

import { useCallback } from "react";
import MediaCardServices from "../components/MediaCardServices";
import { cardsData } from "../data/data";
import { Box, Button } from "@mui/material";
import { ArrowRight } from "lucide-react";

function scrollToSection(sectionId: string): void {
  const element = document.getElementById(sectionId);
  element?.scrollIntoView({ behavior: "smooth" });
}

export default function Services() {
  const handleGetStarted = useCallback(() => {
    scrollToSection("contact");
  }, []);

  return (
    <section
      id="services"
      className="py-24 bg-white"
      aria-labelledby="services-heading"
    >
      <div className="text-center mb-12 pb-12">
        {/* FIXED HEADING */}
        <h2
          id="services-heading"
          className="
            text-[2.75rem]
            text-gray-600
            font-[100]      /* clean, not bold */
            tracking-normal     /* removes drag/stretch issue */
            leading-tight
            antialiased
          "
        >
          Our Services
        </h2>

        <p className="text-xl font-normal mt-5 max-w-3xl mx-auto px-4 text-black">
          Comprehensive technology solutions tailored to accelerate your digital
          journey and drive sustainable business growth.
        </p>
      </div>

      <div className="lg:px-32 mx-4 md:mx-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
          {cardsData.map((card) => (
            <Box
              key={card.id}
              sx={{
                display: "flex",
                justifyContent: "center",
                paddingBottom: "5%",
              }}
            >
              <MediaCardServices data={card} />
            </Box>
          ))}
        </div>
      </div>

      <div className="mt-4 flex flex-col justify-center items-center px-4">
        <p className="text-center text-black py-2 max-w-2xl">
          Get custom solutions for your business that help you leverage AI and
          Automation for the processes. Talk to an expert!
        </p>

        <Button
          variant="contained"
          disableElevation
          onClick={handleGetStarted}
          sx={{
            mt: 2,
            backgroundColor: "black",
            color: "white",
            borderRadius: "50px",
            px: { xs: 3, sm: 4, md: 5 },
            py: { xs: 1, sm: 1.4, md: 1.8 },
            fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: 1,
            "&:hover": {
              backgroundColor: "#333",
            },
          }}
        >
          Get Started Now
          <ArrowRight size={18} aria-hidden="true" />
        </Button>
      </div>
    </section>
  );
}
