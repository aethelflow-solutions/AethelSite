"use client";

import { Typography } from "@mui/material";
import Image from "next/image";
import ContactForm from "../components/ContactForm";
import { useEffect, useState, useRef } from "react";

export default function ContactSection() {
  // typing effect values
  const fullHeading = "One Stop Solution for all the Services";
  const [typed, setTyped] = useState("");
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.4 }
    );

    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;

    let index = 0;
    setTyped("");

    const interval = setInterval(() => {
      index++;
      setTyped(fullHeading.slice(0, index));

      if (index >= fullHeading.length) clearInterval(interval);
    }, 24);

    return () => clearInterval(interval);
  }, [inView]);

  return (
    <section ref={sectionRef} id="contact" className="flex flex-col">
      <div>
        <div className="lg:py-10 py-6 flex justify-center">
          <h2 className="text-black font-semibold text-3xl">Contact Us</h2>
        </div>

        <div className="px-3 sm:px-4 lg:px-6">
          <div
            className="w-full min-h-[90vh] grid grid-cols-1 lg:grid-cols-2 rounded-[36px] overflow-hidden 
            animate-slideUp opacity-0"
            style={{
              background: "linear-gradient(180deg,#05060a,#0d0d11)",
            }}
          >
            {/* LEFT SECTION */}
            <div className="flex items-center justify-center text-white">
              <div className="w-full px-6 md:px-10 lg:px-12 py-6 space-y-6">
                <Typography
                  variant="body1"
                  className="leading-tight font-light text-gray-300 animate-slideUp opacity-0"
                  sx={{ fontSize: { xs: "14px", md: "16px" }, opacity: 0.95 }}
                >
                  We&apos;re here to answer all questions
                </Typography>

                {/* TYPING TEXT */}
                <Typography
                  variant="h2"
                  className="font-semibold py-2 animate-slideUp opacity-0"
                  sx={{
                    fontSize: { xs: "26px", md: "36px" },
                    lineHeight: "1.15",
                    color: "#fff",
                  }}
                >
                  <span>{typed}</span>

                  {/* BLINKING CURSOR */}
                  <span
                    aria-hidden
                    className="inline-block ml-1"
                    style={{
                      width: 10,
                      height: 24,
                      borderRadius: 3,
                      display: "inline-block",
                      animation: "blink 1s steps(1,end) infinite",
                    }}
                  />
                </Typography>

                <Typography
                  variant="body1"
                  className="leading-tight font-light animate-slideUp opacity-0"
                  sx={{ fontSize: { xs: "14px", md: "15px" }, opacity: 0.85 }}
                >
                  Subline for the mission statement is needed here
                </Typography>

                <Typography
                  variant="body1"
                  className="leading-relaxed font-light pt-4 pb-2 animate-slideUp opacity-0"
                  sx={{ fontSize: { xs: "11px", md: "13px" }, opacity: 0.9 }}
                >
                  Let’s transform your enterprise. Partner with Aethel Flow from
                  strategy to implementation — we help solve your business
                  problems across multiple functions and platforms for rapid
                  innovation and boundless growth.
                </Typography>

                {/* BLOCKS */}
                <div className="flex flex-col gap-6 mt-6">
                  {/* BLOCK 1 */}
                  <div className="flex items-start gap-4 animate-slideUp opacity-0">
                    <Image
                      src="/Icon.png"
                      alt="Envision icon"
                      width={32}
                      height={32}
                      className="object-contain"
                    />

                    <div>
                      <h3 className="text-white text-lg font-semibold">
                        Envision The Extraordinary
                      </h3>

                      <p className="text-gray-300 text-sm mt-1 font-light leading-relaxed">
                        Imagine what your business can achieve with the right
                        technology.
                      </p>
                    </div>
                  </div>

                  {/* BLOCK 2 */}
                  <div className="flex items-start gap-4 animate-slideUp opacity-0">
                    <Image
                      src="/Icon (1).png"
                      alt="Creative process icon"
                      width={32}
                      height={32}
                      className="object-contain"
                    />

                    <div>
                      <h3 className="text-white text-lg font-semibold">
                        Immersive Creative Process
                      </h3>

                      <p className="text-gray-300 text-sm mt-1 font-light leading-relaxed">
                        We design and build experiences that transform
                        businesses.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT SECTION — FORM */}
            <div className="flex items-center justify-center py-4 px-4 md:px-6 lg:px-6">
              <div
                className="w-full max-w-9/12
               bg-white rounded-2xl shadow-xl
               p-4 md:p-5 animate-slideUp opacity-0"
              >
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blink { 
          0%, 50% { opacity: 1 } 
          51%, 100% { opacity: 0 } 
        }

        @keyframes slideUp {
          0% {
            opacity: 0;
            transform: translateY(40px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slideUp {
          animation: slideUp .6s ease-out forwards;
        }
      `}</style>
    </section>
  );
}
