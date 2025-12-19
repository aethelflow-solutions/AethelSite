"use client";

import Image from "next/image";
import FeatureAccordion from "../components/FeatureAccordion";
import { useState } from "react";

const FEATURE_IMAGES = [
  "/feature2.png",
  "/accordian1.png",
  "/accordian2.png",
  "/feature1.png",
  "/feature-support.png",
];

export default function FeaturesPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const currentImage =
    activeIndex === null
      ? FEATURE_IMAGES[0]
      : FEATURE_IMAGES[activeIndex + 1];

  return (
    <section className="bg-white text-black pt-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-7xl mx-auto">

        {/* LEFT IMAGE — FULL HEIGHT + 20px LEFT GAP */}
        <div className="relative w-full h-[calc(100vh-6rem)] pl-[20px]">
          <div
            className="
              absolute inset-y-6 left-[20px] right-0
              rounded-2xl
              overflow-hidden
              shadow-[0_60px_100px_rgba(0,0,0,0.22)]
            "
          >
            <Image
              key={currentImage}
              src={currentImage}
              alt="Feature Image"
              fill
              priority
              className="object-cover animate-imageReveal"
            />
          </div>
        </div>

        {/* RIGHT CONTENT — 20px RIGHT GAP */}
        <div className="flex flex-col justify-center space-y-5 pb-10 pr-[20px]">
          <p className="text-sm font-light sky-shine">
            We're here to answer all your questions
          </p>

          <h2 className="text-4xl leading-snug tracking-tight font-extralight">
            Embrace the future with <br />
            <span className="aethel-text">Aethel Flow</span>
          </h2>

          <p className="text-gray-600 text-base max-w-md font-light">
            We deliver scalable and secure solutions tailored to your needs.
          </p>

          <FeatureAccordion
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
          />

          {/* COMPACT BUTTON */}
          <button
            className="
              mt-5 inline-flex
              items-center
              gap-1.5
              px-3 py-1.5
              rounded-full
              border border-black
              text-sm
              w-fit
              hover:bg-black hover:text-white
              transition-all duration-300
            "
            style={{ fontWeight: 400 }}
          >
            Still Need Help? Contact Us →
          </button>
        </div>
      </div>

      {/* ADVANCED IMAGE ANIMATION */}
      <style>{`
        @keyframes imageReveal {
          0% {
            opacity: 0;
            transform: translateY(40px) scale(0.96);
            filter: brightness(0.9);
          }
          60% {
            opacity: 1;
            transform: translateY(-6px) scale(1.02);
            filter: brightness(1.05);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: brightness(1);
          }
        }

        .animate-imageReveal {
          animation: imageReveal 1.4s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .aethel-text {
          background: linear-gradient(90deg, #38bdf8, #7dd3fc, #38bdf8);
          background-size: 200% auto;
          color: transparent;
          -webkit-background-clip: text;
          background-clip: text;
          animation: shine 3s linear infinite;
          font-weight: 300;
        }

        .sky-shine {
          background: linear-gradient(90deg, #38bdf8, #7dd3fc, #38bdf8);
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
