"use client";

import { Typography } from "@mui/material";
import Image from "next/image";
import ContactForm from "../components/ContactForm";
import { useEffect, useState, useRef } from "react";

export default function ContactSection() {
  // NEW TYPING TEXT
  const transformText = "Let’s transform your enterprise";
  const [typedTransform, setTypedTransform] = useState("");
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);

  // OBSERVER (start animation when section is visible)
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

  // TYPING EFFECT (TYPE ONCE – NO DELETE)
  useEffect(() => {
    if (!inView) return;

    let index = 0;

    const interval = setInterval(() => {
      setTypedTransform(transformText.slice(0, index + 1));
      index++;

      if (index === transformText.length) {
        clearInterval(interval); // STOP FOREVER
      }
    }, 50);

    return () => clearInterval(interval);
  }, [inView]);

  return (
    <section ref={sectionRef} id="contact" className="flex flex-col">
      <div>
        <div className="lg:py-10 py-6 flex justify-center">
          <h2 className=" text-[2.75rem]
            text-gray-600
            font-[100]      /* clean, not bold */
            tracking-normal     /* removes drag/stretch issue */
            leading-tight
            antialiased">Contact Us</h2>
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
  className="leading-tight font-light animate-slideUp opacity-0 blue-orange-shine"
  sx={{ fontSize: { xs: "14px", md: "16px" }, opacity: 0.95 }}
>
  We're here to answer all questions
</Typography>


                {/* NEW TYPING HEADING */}
                <Typography
  variant="h2"
  className="font-semibold py-2 animate-slideUp opacity-0"
  sx={{
    fontSize: { xs: "24px", md: "32px" }, // 👈 REDUCED
    lineHeight: "1.2",
    color: "#fff",
    marginBottom: "16px", // 👈 ADDED GAP BELOW
  }}
>
  {typedTransform}
</Typography>


                {/* SUB TEXT (FONT INCREASED) */}
                <Typography
                  variant="body1"
                  className="leading-tight font-light animate-slideUp opacity-0"
                  sx={{ fontSize: { xs: "14px", md: "16px" }, opacity: 0.9 }}
                >
                  Partner with Aethel Flow from strategy to implementation — we
                  help solve your business problems across multiple functions
                  and platforms for rapid innovation and boundless growth.
                </Typography>

                {/* BLOCKS */}
                <div className="flex flex-col gap-6 mt-6">
                  <div className="flex items-start gap-4 animate-slideUp opacity-0">
                    <Image
                      src="/Icon.png"
                      alt="Envision icon"
                      width={32}
                      height={32}
                    />
                    <div>
                      <h3 className="text-white text-lg font-semibold">
                        Envision The Extraordinary
                      </h3>
                      <p className="text-gray-300 text-sm mt-1 font-light">
                        Imagine what your business can achieve with the right
                        technology.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 animate-slideUp opacity-0">
                    <Image
                      src="/Icon (1).png"
                      alt="Creative process icon"
                      width={32}
                      height={32}
                    />
                    <div>
                      <h3 className="text-white text-lg font-semibold">
                        Immersive Creative Process
                      </h3>
                      <p className="text-gray-300 text-sm mt-1 font-light">
                        We design and build experiences that transform
                        businesses.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT SECTION */}
            <div className="flex items-center justify-center py-4 px-4">
              <div className="bg-white rounded-2xl shadow-xl p-4 animate-slideUp opacity-0">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
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


        .blue-orange-shine {
  background: linear-gradient(
    90deg,
    rgba(168, 85, 247, 0.95),   /* purple */
    rgba(236, 72, 153, 0.95),   /* pink */
    rgba(251, 146, 60, 0.9),    /* soft orange */
    rgba(168, 85, 247, 0.95)    /* purple again */
  );
  background-size: 300% auto;
  color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
  animation: glowShift 5s ease-in-out infinite;
}
@keyframes glowShift {
  0% {
    background-position: 0% center;
  }
  50% {
    background-position: 100% center;
  }
  100% {
    background-position: 0% center;
  }
}

  `}</style>
    </section>
  );
}
