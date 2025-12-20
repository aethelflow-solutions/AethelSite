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
      className="relative flex justify-center text-white py-10 px-6 rounded-[30px] overflow-hidden"
      aria-labelledby="mission-heading"
    >
      {/* 🔥 IMPROVED BACKGROUND VIDEO */}
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

      {/* DARK OVERLAY (lighter than before) */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-[1px] rounded-[30px]"
        aria-hidden="true"
      />

      {/* CONTENT */}
      <div className="relative z-10 w-full max-w-5xl">
        {/* Mission Statement */}
        <div className="text-center space-y-5 pb-16 max-w-[620px] mx-auto">
          <Typography
            id="mission-heading"
            component="h2"
            className="font-semibold"
            sx={{ fontSize: { xs: "26px", md: "42px" } }}
          >
            Mission Statement
          </Typography>

          <Typography
            component="p"
            className="leading-relaxed opacity-90"
            sx={{ fontSize: { xs: "14px", md: "16px" } }}
          >
            Our mission at Aethel Flow is to empower organizations with intelligent
            automation that is both seamless and human-centric. We design
            solutions that eliminate inefficiencies and unlock growth.
          </Typography>
        </div>

        {/* Cards Grid (REDUCED SIZE) */}
        <div
          ref={cardsRef}
          className={`grid grid-cols-1 md:grid-cols-2 gap-8 transition-all duration-700 ${
            showCards
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          {/* Left Cards */}
          <div className="flex flex-col items-end gap-8">
            {missionCards.slice(0, 2).map((card, i) => (
              <div
                key={card.id}
                className={`scale-[0.92] transition-all duration-700 ${
                  showCards
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-8"
                }`}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                <MediaCardMission1 data={card} />
              </div>
            ))}
          </div>

          {/* Right Cards */}
          <div className="flex flex-col items-start gap-8 md:pt-12">
            {missionCards.slice(2, 4).map((card, i) => (
              <div
                key={card.id}
                className={`scale-[0.92] transition-all duration-700 ${
                  showCards
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-8"
                }`}
                style={{ transitionDelay: `${(i + 2) * 120}ms` }}
              >
                <MediaCardMission1 data={card} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
