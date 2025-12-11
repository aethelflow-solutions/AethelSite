"use client";

import AButton from "../components/AButton";
import { Typography } from "@mui/material";

export default function HeroSection() {
  return (
    <section
      id="home"
      className="flex items-center bg-[url('/bg1.jpg')] bg-cover h-screen text-white pt-32 pb-28 px-6 rounded-3xl"
    >
      <div className="w-full flex flex-col items-start justify-center gap-6 max-w-3xl mx-auto text-left md:text-left ml-10">
        {/* ADDED ml-10 (40px approx) & changed items-center → items-start */}
        <Typography
          variant="h3"
          className="font-bold leading-tight heroTitle"
          sx={{ fontSize: { xs: "26px", md: "34px" } }}
        >
          Supercharge your operations with AI that delivers seamless automation
        </Typography>

        <Typography
          variant="body1"
          className="leading-tight heroText animate-fadeIn delay-500"
          sx={{ fontSize: { xs: "14px", md: "17px" } }}
        >
          At Aethel Flow, we harness AI and automation to streamline workflows,
          spark innovation, and empower businesses to move faster with seamless,
          intelligent solutions for a future that flows effortlessly.
        </Typography>

        <div className="mt-4">
          <AButton
            children="Contact Us"
            variant="outlined"
            sx={{
              color: "white",
              border: "none",
              backgroundColor: "#692ac8",
              borderRadius: "50px",
              paddingX: 5,
              paddingY: 2.5,
              textTransform: "none",
              fontSize: "16px",
            }}
            onClick={() => {
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          />
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 1s forwards;
        }
        .animate-fadeIn {
          animation: fadeInUp 1s forwards;
          animation-delay: 0.5s;
        }
        .animate-bounce-slow {
          animation: bounce 15s infinite alternate;
        }
        @keyframes bounce {
          0% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(25px);
          }
          100% {
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
