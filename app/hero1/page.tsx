"use client";
import FloatingLines from "../components/react-bits/FloatingLines";

import { useCallback } from "react";
import { Typography } from "@mui/material";
import AButton from "../components/AButton";
import TextType from "../components/react-bits/TextType";

function scrollToSection(sectionId: string): void {
  const element = document.getElementById(sectionId);
  element?.scrollIntoView({ behavior: "smooth" });
}

const page = () => {
  const handleContactClick = useCallback(() => {
    scrollToSection("contact");
  }, []);
  return (
    <section className="w-full h-screen relative text-black p-6">
      <div className="bg-black ">
        <FloatingLines
          enabledWaves={["top", "middle", "bottom"]}
          // Array - specify line count per wave; Number - same count for all waves
          lineCount={[10, 15, 20]}
          // Array - specify line distance per wave; Number - same distance for all waves
          lineDistance={[8, 6, 4]}
          bendRadius={5.0}
          bendStrength={-0.5}
          interactive={true}
          parallax={false}
        />

        <div className=" absolute bottom-0 top-0 z-10  flex flex-col items-center justify-center text-white px-4 text-center">
          <div className="w-full flex flex-col items-start justify-center gap-6 max-w-3xl mx-auto text-left ml-10">
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
                "Drive innovation with AI-powered operational excellence",
              ]}
              typingSpeed={60}
              pauseDuration={1500}
              showCursor={false}
              cursorCharacter="|"
              className="text-5xl  font-extrabold heroTitle"
              //   textColors={["#e5e5e1"]}
              // loop={false}
              onSentenceComplete={() => console.log("Sentence completed!")}
              startOnVisible={true}
              reverseMode={false}
            />
            <Typography
              component="p"
              variant="body1"
              className="leading-relaxed animate-fadeIn text-black"
              sx={{ fontSize: { xs: "14px", md: "17px" } }}
            >
              At Aethel Flow, we harness AI and automation to streamline
              workflows, spark innovation, and empower businesses to move faster
              with seamless, intelligent solutions for a future that flows
              effortlessly.
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
        </div>
      </div>
    </section>
  );
};

export default page;
