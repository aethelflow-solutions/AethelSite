"use client";

import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import gsap from "gsap";

const DATA = [
  {
    title: "Scalable Architecture",
    content: "Our systems grow with your business without performance issues.",
  },
  {
    title: "Enterprise Security",
    content: "We follow industry-grade security standards to protect data.",
  },
  {
    title: "Easy And Fast Deployment",
    content: "Agile process ensures faster delivery and iterations.",
  },
  {
    title: "Dedicated Support",
    content: "Our team is always available for assistance and maintenance.",
  },
];

interface Props {
  activeIndex: number | null;
  setActiveIndex: Dispatch<SetStateAction<number | null>>;
}

export default function FeatureAccordion({
  activeIndex,
  setActiveIndex,
}: Props) {
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    contentRefs.current.forEach((el, index) => {
      if (!el) return;

      const contentHeight = el.scrollHeight;

      if (activeIndex === index) {
        gsap.fromTo(
          el,
          { height: 0, opacity: 0, y: -6 },
          {
            height: contentHeight,
            opacity: 1,
            y: 0,
            duration: 0.45,
            ease: "power3.out",
            clearProps: "height",
          }
        );
      } else {
        gsap.to(el, {
          height: 0,
          opacity: 0,
          y: -6,
          duration: 0.35,
          ease: "power3.inOut",
        });
      }
    });
  }, [activeIndex]);

  return (
    <div className="border-t border-b border-white divide-y divide-white">
      {DATA.map((item, index) => {
        const isOpen = activeIndex === index;

        return (
          <div key={index} className="py-3 sm:py-4 lg:py-5">
            {/* HEADER */}
            <button
              onClick={() => setActiveIndex(isOpen ? null : index)}
              className="w-full flex items-center justify-between text-left cursor-pointer"
            >
              <h3 className="text-sm sm:text-base lg:text-[18px] font-normal">
                {item.title}
              </h3>

              <span
                className="
                  w-7 h-7 sm:w-8 sm:h-8
                  flex items-center justify-center
                  rounded-full bg-white text-black
                  text-base sm:text-lg
                  transition-transform duration-300
                "
                style={{
                  transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                }}
              >
                {isOpen ? "−" : "+"}
              </span>
            </button>

            {/* CONTENT */}
            <div
              ref={(el) => {
                contentRefs.current[index] = el;
              }}
              style={{
                height: 0,
                overflow: "hidden",
                opacity: 0,
              }}
            >
              <p className="text-xs sm:text-sm text-white max-w-md mt-3 font-light leading-relaxed">
                {item.content}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
