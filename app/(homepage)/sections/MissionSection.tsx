"use client";

import { Typography } from "@mui/material";
import { MediaCardMission1 } from "../../components/MediaCardMission";
import { useEffect, useRef, useState } from "react";
import type { CardData } from "../../../data/data";

const missionCards: CardData[] = [
  {
    id: 1,
    title: "Innovation with Purpose",
    description:
      "We embrace cutting-edge AI and automation not just for speed, but to create meaningful impact.",
    icon: "/Icon (2).png",
  },
  {
    id: 2,
    title: "Human-Centric Design",
    description:
      "Every solution is built to feel intuitive, empathetic, and aligned with human needs.",
    icon: "/011-online communication.png",
  },
  {
    id: 3,
    title: "Integrity & Trust",
    description:
      "Transparency and reliability guide our work, ensuring lasting partnerships.",
    icon: "/022-text to speech.png",
  },
  {
    id: 4,
    title: "Seamless Flow",
    description:
      "Automation should feel effortless, like a natural extension of your workflow.",
    icon: "/004-smart assistant.png",
  },
];

export default function MissionSection() {
  const cardsRef = useRef<HTMLDivElement>(null);
  const [showCards, setShowCards] = useState(false);

  useEffect(() => {
    if (!cardsRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowCards(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(cardsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="mission"
      className="relative flex justify-center text-white py-6 px-6 rounded-3xl max-[640px]:rounded-2xl overflow-hidden"
      aria-labelledby="mission-heading"
    >
      {/* Background Video */}
      <video
        className="
          absolute inset-0 
          w-full h-full 
          object-cover 
          scale-[1.02] 
          brightness-[0.95] 
          contrast-[1.05] 
          saturate-[1.05]
        "
        src="/mission.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />

      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-[1px] rounded-[30px]"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-5xl">
        {/* Mission Statement */}
        <div className="text-center space-y-3 pt-1 pb-8 max-w-[480px] mx-auto"> {/* reduced width for 2 lines */}
          <Typography
            id="mission-heading"
            component="h2"
            className="font-semibold"
            sx={{ fontSize: { xs: "26px", md: "38px" } }}
          >
            Mission Statement
          </Typography>

          <Typography
            component="p"
            className="leading-relaxed opacity-90"
            sx={{ fontSize: { xs: "14px", md: "15px" }, lineHeight: 1.5 }}
          >
            Our mission at Aethel Flow is to empower organizations with intelligent automation that is seamless and human-centric.
          </Typography>
        </div>

        {/* Cards Grid */}
        <div
          ref={cardsRef}
          className={`grid grid-cols-1 md:grid-cols-2 gap-6 transition-all duration-700 ${
            showCards
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          {/* Left Cards */}
          <div className="flex flex-col items-end gap-6">
            {missionCards.slice(0, 2).map((card, i) => (
              <div
                key={card.id}
                className={`scale-[0.88] transition-all duration-700 mb-4 ${
                  showCards
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-8"
                }`}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                <MediaCardMission1
                  data={card}
                  descriptionFontSize={{ xs: "15px", md: "17px" }}
                />
              </div>
            ))}
          </div>

          {/* Right Cards */}
          <div className="flex flex-col items-start gap-6 md:pt-8">
            {missionCards.slice(2, 4).map((card, i) => (
              <div
                key={card.id}
                className={`scale-[0.88] transition-all duration-700 mb-4 ${
                  showCards
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-8"
                }`}
                style={{ transitionDelay: `${(i + 2) * 120}ms` }}
              >
                <MediaCardMission1
                  data={card}
                  descriptionFontSize={{ xs: "15px", md: "17px" }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
