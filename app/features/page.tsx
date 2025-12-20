"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import FeatureAccordion from "../components/FeatureAccordion";

const FEATURE_IMAGES = [
  "/feature2.png",
  "/accordian1.png",
  "/security.png",
  "/feature1.png",
  "/feature-support.png",
];

export default function FeaturesPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [typedText, setTypedText] = useState("");
  const fullText = "Embrace the future with Aethel Flow";
  const indexRef = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTypedText(fullText.slice(0, indexRef.current + 1));
      indexRef.current += 1;
      if (indexRef.current === fullText.length) clearInterval(interval);
    }, 80);

    return () => clearInterval(interval);
  }, []);

  const currentImage =
    activeIndex === null
      ? FEATURE_IMAGES[0]
      : FEATURE_IMAGES[activeIndex + 1];

  return (
    <>
      {/* ✅ SMALL OUTER GAP (2–3px) */}
      <div className="px-[3px]">
        {/* MAIN BLACK SECTION */}
        <section className="bg-black text-white pt-24 px-4 rounded-[30px] overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 py-14">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">

              {/* LEFT IMAGE */}
              <div className="relative w-full h-[70vh] lg:h-[80vh] flex justify-start">
                <div
                  className="
                    relative w-[90%] h-full
                    rounded-2xl overflow-hidden
                    shadow-[0_0_80px_rgba(56,189,248,0.4)]
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

              {/* RIGHT CONTENT */}
              <div className="flex flex-col justify-center space-y-5 pb-10">
                <p className="text-white text-sm font-light">
                  We're here to answer all your questions
                </p>

                <h2 className="text-4xl leading-snug tracking-tight font-extralight min-h-[5rem]">
                  <span className="text-white">
                    {typedText.replace("Aethel Flow", "")}
                  </span>
                  <span className="text-sky-400">
                    {typedText.includes("Aethel Flow") ? "Aethel Flow" : ""}
                  </span>
                </h2>

                <p className="text-white text-base max-w-md font-light">
                  We deliver scalable and secure solutions tailored to your needs.
                </p>

                <FeatureAccordion
                  activeIndex={activeIndex}
                  setActiveIndex={setActiveIndex}
                />

                {/* ✅ SHORT & CLEAN BUTTON */}
                <button
                  className="
                    mt-4
                    inline-flex w-fit
                    items-center gap-1
                    px-2.5 py-1
                    rounded-full
                    border border-white
                    text-[11px] font-light
                    hover:bg-white hover:text-black
                    transition
                  "
                >
                  Still Need Help? Contact Us →
                </button>
              </div>
            </div>
          </div>

          {/* IMAGE ANIMATION */}
          <style>{`
            @keyframes imageReveal {
              0% {
                opacity: 0;
                transform: translateY(40px) scale(0.96);
              }
              100% {
                opacity: 1;
                transform: translateY(0) scale(1);
              }
            }
            .animate-imageReveal {
              animation: imageReveal 1.2s ease-out;
            }
          `}</style>
        </section>
      </div>
    </>
  );
}
