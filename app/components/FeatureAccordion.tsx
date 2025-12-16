"use client";

import { useState } from "react";

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
    title: "Fast Development",
    content: "Agile process ensures faster delivery and iterations.",
  },
  {
    title: "Dedicated Support",
    content: "Our team is always available for assistance and maintenance.",
  },
];

export default function FeatureAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="border-t border-b border-black/20 divide-y divide-black/20">
      {DATA.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <div key={index} className="py-4">

            {/* HEADER */}
            <button
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="w-full flex items-center justify-between text-left"
            >
              {/* TITLE — VERY LIGHT */}
              <h3
                className="text-base text-gray-900"
                style={{ fontWeight: 300 }}
              >
                {item.title}
              </h3>

              {/* + / − ICON — PERFECT CENTER */}
              <span
                className="
                  w-8 h-8
                  flex items-center justify-center
                  rounded-full
                  bg-black
                  text-white
                  text-lg
                "
                style={{
                  lineHeight: "1",
                  fontWeight: 400,
                }}
              >
                {isOpen ? "−" : "+"}
              </span>
            </button>

            {/* CONTENT */}
            {isOpen && (
              <p
                className="mt-3 text-sm text-gray-600 max-w-md"
                style={{ fontWeight: 300, lineHeight: "1.6" }}
              >
                {item.content}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
