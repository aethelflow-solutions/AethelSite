"use client";

import AButton from "../components/AButton";
import { Typography } from "@mui/material";

export default function HeroSection() {
  return (
    <section className="relative flex items-center h-screen text-white px-12 overflow-hidden bg-gradient-to-b from-[#0f1c2f] to-[#162b44] rounded-3xl">

      {/* Smooth Dynamic Waves */}
      <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 1440 800" preserveAspectRatio="none">
        {/* Foreground Wave */}
        <path fill="#66c2ff" fillOpacity="0.4">
          <animate
            attributeName="d"
            dur="10s"
            repeatCount="indefinite"
            values="
              M0,400 C360,380 1080,420 1440,400 L1440,0 L0,0 Z;
              M0,420 C360,400 1080,440 1440,420 L1440,0 L0,0 Z;
              M0,400 C360,380 1080,420 1440,400 L1440,0 L0,0 Z
            "
          />
          <animateTransform 
            attributeName="transform"
            attributeType="XML"
            type="translate"
            values="0 0; -20 0; 0 0"
            dur="12s"
            repeatCount="indefinite"
          />
        </path>

        {/* Midground Wave */}
        <path fill="#a0eaff" fillOpacity="0.25">
          <animate
            attributeName="d"
            dur="14s"
            repeatCount="indefinite"
            values="
              M0,380 C360,360 1080,400 1440,380 L1440,0 L0,0 Z;
              M0,400 C360,380 1080,420 1440,400 L1440,0 L0,0 Z;
              M0,380 C360,360 1080,400 1440,380 L1440,0 L0,0 Z
            "
          />
          <animateTransform 
            attributeName="transform"
            attributeType="XML"
            type="translate"
            values="0 0; 15 0; 0 0"
            dur="16s"
            repeatCount="indefinite"
          />
        </path>

        {/* Background Wave */}
        <path fill="#d0f4ff" fillOpacity="0.2">
          <animate
            attributeName="d"
            dur="18s"
            repeatCount="indefinite"
            values="
              M0,360 C360,340 1080,380 1440,360 L1440,0 L0,0 Z;
              M0,380 C360,360 1080,400 1440,380 L1440,0 L0,0 Z;
              M0,360 C360,340 1080,380 1440,360 L1440,0 L0,0 Z
            "
          />
          <animateTransform 
            attributeName="transform"
            attributeType="XML"
            type="translate"
            values="0 0; -10 0; 0 0"
            dur="20s"
            repeatCount="indefinite"
          />
        </path>
      </svg>

      {/* Floating blurred circles */}
      <div className="absolute w-72 h-72 bg-[#66c2ff] rounded-full opacity-25 blur-3xl animate-bounce-slow" style={{ top: "15%", left: "5%" }} />
      <div className="absolute w-96 h-96 bg-[#a0eaff] rounded-full opacity-20 blur-3xl animate-bounce-slow" style={{ top: "50%", left: "60%" }} />
      <div className="absolute w-64 h-64 bg-[#d0f4ff] rounded-full opacity-20 blur-2xl animate-bounce-slow" style={{ top: "70%", left: "30%" }} />

      {/* Hero Content - Left aligned */}
      <div className="w-full flex flex-col items-start justify-center gap-6 max-w-2xl relative z-10 text-left">
        <Typography
          variant="h3"
          className="font-bold leading-tight heroTitle transform transition-transform duration-700 ease-out hover:scale-105 hover:translate-y-1 animate-fadeInUp"
          sx={{ fontSize: { xs: "26px", md: "36px" } }}
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
              borderColor: "white",
              borderRadius: "50px",
              paddingX: 2.2,
              paddingY: 0.6,
              textTransform: "none",
              fontSize: "14px",
            }}
            onClick={() => {
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            }}
          />
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
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
          0% { transform: translateY(0); }
          50% { transform: translateY(25px); }
          100% { transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
