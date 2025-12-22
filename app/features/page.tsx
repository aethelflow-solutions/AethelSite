"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import FeatureAccordion from "../components/FeatureAccordion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FEATURE_IMAGES = [
  "/embrace.png",
  "/scalable architecture.png",
  "/Cyber.png",
  "/fast development.png",
  "/Support..png",
];

export default function FeaturesPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [typedText, setTypedText] = useState("");
  const fullText = "Embrace the future with Aethel Flow";
  const indexRef = useRef(0);

  const sectionRef = useRef<HTMLElement | null>(null);
  const imageWrapRef = useRef<HTMLDivElement | null>(null);
  const contentWrapRef = useRef<HTMLDivElement | null>(null);

  /* =========================
     TYPING EFFECT
  ========================= */
  useEffect(() => {
    indexRef.current = 0;
    setTypedText("");

    const interval = setInterval(() => {
      indexRef.current += 1;
      setTypedText(fullText.slice(0, indexRef.current));
      if (indexRef.current === fullText.length) clearInterval(interval);
    }, 80);

    return () => clearInterval(interval);
  }, []);

  /* =========================
     GSAP ENTRY
  ========================= */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(imageWrapRef.current, { opacity: 0, y: 60, scale: 0.96 });
      gsap.set(contentWrapRef.current?.children || [], {
        opacity: 0,
        y: 40,
      });

      gsap.to(imageWrapRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          once: true,
        },
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
        ease: "power2.out",
      });

      gsap.to(contentWrapRef.current?.children || [], {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          once: true,
        },
        opacity: 1,
        y: 0,
        stagger: 0.14,
        duration: 0.9,
        ease: "power2.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const currentImage =
    activeIndex === null
      ? FEATURE_IMAGES[0]
      : FEATURE_IMAGES[activeIndex + 1];

  return (
    <div className="px-4 sm:px-5">
      <section
        ref={sectionRef}
        className="bg-black text-white pt-20 lg:pt-24 rounded-[30px] overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-12 lg:py-14">

          {/* ✅ GRID FIXED FOR iPad Pro */}
          <div className="grid grid-cols-1 2xl:grid-cols-2 gap-12 lg:gap-16 2xl:gap-40">

            {/* IMAGE — TOP on iPad Pro */}
            <div className="order-1 flex justify-start">
              <div
                ref={imageWrapRef}
                className="
                  relative w-full
                  h-[42vh]
                  sm:h-[55vh]
                  md:h-[60vh]
                  lg:h-[65vh]
                  xl:h-[55vh]     /* iPad Pro FIX */
                  2xl:h-[80vh]

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
                  className="object-cover"
                />
              </div>
            </div>

            {/* CONTENT — BELOW IMAGE on iPad Pro */}
            <div className="order-2 flex justify-start">
              <div
                ref={contentWrapRef}
                className="
                  w-full
                  flex flex-col justify-center
                  space-y-4 sm:space-y-5 lg:space-y-6
                  pb-6 sm:pb-8 lg:pb-10
                  max-w-full xl:max-w-3xl
                "
              >
                <p className="text-xs sm:text-sm font-light">
                  We're here to answer all your questions
                </p>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl leading-snug tracking-tight font-extralight">
                  <span className="text-white">
                    {typedText.replace("Aethel Flow", "")}
                  </span>
                  <span className="text-sky-400">
                    {typedText.includes("Aethel Flow") ? "Aethel Flow" : ""}
                  </span>
                </h2>

                <p className="text-sm sm:text-base font-light">
                  We deliver scalable and secure solutions tailored to your needs.
                </p>

                <FeatureAccordion
                  activeIndex={activeIndex}
                  setActiveIndex={setActiveIndex}
                />

                <button
                  className="
                    mt-3 lg:mt-4 inline-flex w-fit items-center gap-1
                    px-3 py-1.5 rounded-full border border-white
                    text-sm font-light
                    hover:bg-white hover:text-black transition
                  "
                >
                  Still Need Help? Contact Us →
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
