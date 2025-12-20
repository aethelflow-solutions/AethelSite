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
    <div className="border-t border-b border-white divide-y divide-white">
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
              "
            >
              <h3 className="text-white text-[18px]" style={{ fontWeight: 400 }}>
                {item.title}
              </h3>

              <span className="
                w-8 h-8 flex items-center justify-center
                rounded-full bg-white text-black text-lg
                transition-transform duration-300
              ">
                {isOpen ? "−" : "+"}
              </span>
            </button>

            {/* CONTENT */}
            <div
              className={`overflow-hidden transition-all duration-500 ${
                isOpen ? "max-h-40 opacity-100 mt-3" : "max-h-0 opacity-0"
              }`}
            >
              <p
                className="text-white text-sm max-w-md"
                style={{ lineHeight: "1.6", fontWeight: 300 }}
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
