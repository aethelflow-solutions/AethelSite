"use client";

import { Dispatch, SetStateAction } from "react";

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
  return (
    <div className="border-t border-b border-black/20 divide-y divide-black/20">
      {DATA.map((item, index) => {
        const isOpen = activeIndex === index;

        return (
          <div key={index} className="py-5">
            {/* HEADER */}
            <button
              onClick={() => setActiveIndex(isOpen ? null : index)}
              className="
                w-full flex items-center justify-between
                text-left cursor-pointer
                transition-all duration-300
                hover:pl-1
                group
              "
            >
              {/* TITLE */}
              <h3
                className="
                  text-[18px]
                  text-gray-700
                  transition-colors duration-300
                  group-hover:text-black
                "
                style={{ fontWeight: 350 }}
              >
                {item.title}
              </h3>

              {/* ICON */}
              <span
                className="
                  w-8 h-8 flex items-center justify-center
                  rounded-full
                  bg-black text-white
                  text-lg
                  transition-all duration-300
                  group-hover:scale-110
                "
                style={{ lineHeight: "1" }}
              >
                {isOpen ? "−" : "+"}
              </span>
            </button>

            {/* CONTENT WITH ANIMATION */}
            <div
              className={`
                overflow-hidden
                transition-all duration-500 ease-in-out
                ${isOpen ? "max-h-40 opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-2"}
              `}
            >
              <p
                className="mt-3 text-sm text-gray-600 max-w-md"
                style={{ fontWeight: 300, lineHeight: "1.6" }}
              >
                {item.content}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
