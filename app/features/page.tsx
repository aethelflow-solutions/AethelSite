"use client";

import Image from "next/image";
import FeatureAccordion from "../components/FeatureAccordion";
import { useEffect, useState } from "react";

export default function FeaturesPage() {
  const line1 = "Embrace the future with";
  const line2 = "Aethal Flow";

  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [phase, setPhase] = useState<"typing1" | "typing2" | "done">("typing1");

  useEffect(() => {
    const speed = 60;

    const timer = setTimeout(() => {
      // TYPE FIRST LINE
      if (phase === "typing1") {
        if (text1.length < line1.length) {
          setText1(line1.slice(0, text1.length + 1));
        } else {
          setPhase("typing2");
        }
      }

      // TYPE SECOND LINE
      else if (phase === "typing2") {
        if (text2.length < line2.length) {
          setText2(line2.slice(0, text2.length + 1));
        } else {
          setPhase("done"); // STOP EVERYTHING
        }
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [text1, text2, phase]);

  return (
    <section className="min-h-screen bg-white text-black flex items-center px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 w-full max-w-7xl mx-auto">

        {/* LEFT IMAGE */}
     {/* LEFT IMAGE */}
<div className="flex justify-center items-center">
  <div
    className="
      rounded-2xl
      shadow-[0_25px_60px_rgba(0,0,0,0.12)]
      hover:shadow-[0_35px_80px_rgba(0,0,0,0.18)]
      transition-shadow duration-300
      overflow-hidden
    "
  >
    <Image
      src="/feature2.png"
      alt="Features"
      width={520}     // slightly wider
      height={420}    // ⬅ increased height
      priority
      className="object-contain"
    />
  </div>
</div>


        {/* RIGHT CONTENT */}
        <div className="space-y-1">
          <p className="text-sm font-light sky-shine">
            We're here to answer all your questions
          </p>

          {/* HEADING */}
          <h2 className="text-4xl leading-snug tracking-tight font-extralight">
            <span>{text1}</span>
            <br />
            <span className="aethel-text">{text2}</span>
          </h2>

          <p className="text-gray-600 text-base max-w-md font-light">
            We deliver scalable and secure solutions tailored to your needs.
          </p>

          <FeatureAccordion />

          <button
            className="
              mt-4
              inline-flex items-center gap-2
              px-4 py-2
              rounded-full
              border border-black
              text-black
              bg-transparent
              hover:bg-black hover:text-white
              transition-all duration-300 
              cursor-pointer
            "
            style={{ fontWeight: 400, fontSize: "0.875rem" }}
          >
            Still Need Help? Contact Us Now →
          </button>
        </div>
      </div>

      {/* TEXT SHINE EFFECT */}
      <style>{`
        .aethel-text {
          background: linear-gradient(
            90deg,
            #38bdf8,
            #7dd3fc,
            #38bdf8
          );
          background-size: 200% auto;
          color: transparent;
          -webkit-background-clip: text;
          background-clip: text;
          animation: shine 3s linear infinite;
          font-weight: 300;
        }

        .sky-shine {
          background: linear-gradient(
            90deg,
            #38bdf8,
            #7dd3fc,
            #38bdf8
          );
          background-size: 200% auto;
          color: transparent;
          -webkit-background-clip: text;
          background-clip: text;
          animation: shine 3s linear infinite;
        }

        @keyframes shine {
          to {
            background-position: 200% center;
          }
        }
      `}</style>
    </section>
  );
}
