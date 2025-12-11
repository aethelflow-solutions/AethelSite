import { Typography } from "@mui/material";
import { MediaCardMission1 } from "../components/MediaCardMission";
import { useEffect, useRef, useState } from "react";
import { CardData } from "../data/data";

const missionCards: CardData[] = [
  { id: 1, title: "Innovation with Purpose", description: "We embrace cutting-edge AI and automation not just for speed, but to create meaningful impact.", icon: "/Icon (2).png" },
  { id: 2, title: "Human-Centric Design", description: "Every solution is built to feel intuitive, empathetic, and aligned with human needs.", icon: "/011-online communication.png" },
  { id: 3, title: "Integrity & Trust", description: "Transparency and reliability guide our work, ensuring lasting partnerships.", icon: "/022-text to speech.png" },
  { id: 4, title: "Seamless Flow", description: "Automation should feel effortless, like a natural extension of your workflow.", icon: "/004-smart assistant.png" },
];

export default function MissionSection() {
  const cardsRef = useRef(null);
  const [showCards, setShowCards] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) setShowCards(true); }); },
      { threshold: 0.2 }
    );
    if (cardsRef.current) observer.observe(cardsRef.current);
  }, []);

  return (
    <>
      {/* Vision outside black box */}
      <div className="w-full flex justify-center py-20 px-3 text-black">
        <div className="max-w-3xl text-center space-y-5">
          <Typography variant="h2" className="font-bold" sx={{ fontSize: { xs: "24px", md: "36px" } }}>
            Our Vision
          </Typography>
          <Typography variant="body1" className="opacity-90 leading-relaxed" sx={{ fontSize: { xs: "14px", md: "17px" } }}>
            At Aethel Flow, our vision is to redefine the future of work using intelligent automation
            that blends efficiency with human empathy—creating workflows that feel effortless and future-ready.
          </Typography>
        </div>
      </div>

      {/* Black Box Mission Section */}

      <section
  id="mission"
className="relative flex justify-center text-white py-8 px-6" 

  style={{
    backgroundColor: "#1B1A1A",
    borderRadius: "30px",
    backgroundImage: "url(/Image2.png)",
    backgroundSize: "600px 600px",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  }}
>
  {/* Black overlay with reduced blur */}
  <div className="absolute inset-0 bg-black/40 backdrop-blur-[1.5px] rounded-[30px]"></div>

  <div className="relative z-10 w-full max-w-6xl">
    
    {/* Mission Statement */}
    <div
  className="text-center space-y-6 animate-fadeSlideUp pb-20"
  style={{ maxWidth: "700px", margin: "0 auto" }}
>
  <Typography variant="h2" className="font-bold" sx={{ fontSize: { xs: "28px", md: "46px" } }}>
    Mission Statement
  </Typography>

  <Typography
    variant="body1"
    className="leading-relaxed opacity-90"
    sx={{ fontSize: { xs: "15px", md: "18px" } }}
  >
    Our mission at Aethel Flow is to empower organizations with intelligent automation
    that is both seamless and human-centric. We design solutions that eliminate inefficiencies,
    enhance decision-making, and unlock new growth opportunities.
  </Typography>
</div>


    {/* Cards */}
    <div
      ref={cardsRef}
      className={`grid grid-cols-1 md:grid-cols-2 gap-12 transition-all duration-700 ${
        showCards ? "opacity-100" : "opacity-0 translate-y-10"
      }`}
    >
      {/* Left Cards */}
      <div className="flex flex-col items-end gap-14">
        {missionCards.slice(0, 2).map((card, i) => (
          <div
            key={card.id}
            className={`transition-all duration-700 delay-${i * 150} ${
              showCards ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}
          >
            <MediaCardMission1 data={card} />
          </div>
        ))}
      </div>

      {/* Right Cards */}
      <div className="flex flex-col items-start gap-14 md:pt-16">
        {missionCards.slice(2, 4).map((card, i) => (
          <div
            key={card.id}
            className={`transition-all duration-700 delay-${(i + 2) * 150} ${
              showCards ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
          >
            <MediaCardMission1 data={card} />
          </div>
        ))}
      </div>
    </div>
  </div>
</section>


      {/* Tailwind Animations */}
      <style>
        {`
        @keyframes fadeSlideUp {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeSlideUp { animation: fadeSlideUp 1.2s ease-out forwards; }
        `}
      </style>
    </>
  );
}
