"use client";

import Link from "next/link";
import { FaLinkedin, FaTwitter, FaFacebook } from "react-icons/fa";
import { useEffect, useRef } from "react";
import gsap from "gsap";

interface SocialLink {
  href: string;
  label: string;
  icon: React.ReactNode;
}

const SOCIAL_LINKS: SocialLink[] = [
  { href: "https://linkedin.com", label: "LinkedIn", icon: <FaLinkedin /> },
  { href: "https://twitter.com", label: "Twitter", icon: <FaTwitter /> },
  { href: "https://facebook.com", label: "Facebook", icon: <FaFacebook /> },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const wRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!wRef.current) return;

    gsap.fromTo(
      wRef.current,
      { y: 6 },
      {
        y: -6,
        duration: 2.5,
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true,
      }
    );
  }, []);

  return (
    <footer className="w-full mt-20 mb-5 px-4 md:px-6 bg-white">
      <div
        className="relative overflow-hidden rounded-[26px] py-10 px-6 md:px-14 max-w-11xl mx-auto text-white"
        style={{ backgroundColor: "#1B1A1A" }}
      >
        {/* overlay */}
        <div className="absolute inset-0 bg-black/30 backdrop-blur-[1.2px] rounded-[26px]" />

        {/* CONTENT */}
        <div className="relative z-10 flex flex-col gap-10">

          {/* TOP SECTION */}
          <div className="flex flex-col md:flex-row justify-between gap-10 text-center md:text-left">

            {/* LEFT */}
            <div className="space-y-4 text-[14px] md:text-base text-gray-300">
              <p>
                <span className="font-semibold text-white">Email:</span>{" "}
                <a
                  href="mailto:contact@aethelflow.com"
                  className="hover:text-white transition underline-offset-4 hover:underline"
                >
                  contact@aethelflow.com
                </a>
              </p>

              <p>
                <span className="font-semibold text-white">Phone:</span>{" "}
                <a
                  href="tel:+917416656592"
                  className="hover:text-white transition"
                >
                  +91 7416656592
                </a>
              </p>

              {/* SOCIAL ICONS */}
              <ul className="flex justify-center md:justify-start gap-6 text-2xl pt-2">
                {SOCIAL_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      target="_blank"
                      className="text-white/70 hover:text-white transition hover:scale-110"
                    >
                      {link.icon}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* CENTER – ADDRESS (unchanged) */}
            <div className="text-[14px] md:text-base text-gray-300 leading-relaxed mt-4 md:mt-0">
              <address className="not-italic flex flex-col items-center md:items-start">
                <span className="block">
                  9-4-136/19,20 &amp; 21/A, Shareef Residency, 3rd Floor
                </span>
                <span className="block mt-1 ml-0 md:ml-13">
                  7 Tombs Road, Tolichowki Hyderabad
                </span>
                <span className="block mt-1 ml-0 md:ml-35">
                  Telangana
                </span>
              </address>
            </div>

            {/* RIGHT – COPYRIGHT (unchanged) */}
            <div className="text-[13px] md:text-base font-medium text-white leading-relaxed mt-4 md:mt-0 flex flex-col items-center md:items-start">
              <span className="block">
                © {currentYear} Aethel Flow Solutions Pvt. Ltd.
              </span>
              <span className="block mt-1 ml-0 md:ml-20 opacity-90">
                All Rights Reserved
              </span>
            </div>
          </div>

          {/* DIVIDER */}
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        {/* BRAND – RESPONSIVE */}
<div className="text-center mb-0">
  <h1
    className="flex justify-center gap-2 sm:gap-3 md:gap-4
               text-[36px] sm:text-[48px] md:text-[100px] lg:text-[130px]
               font-extrabold tracking-widest
               select-none break-words
               leading-none mb-0"
    style={{
      fontFamily: "'Montserrat', 'Poppins', sans-serif",
      color: "rgba(220,220,220,0.45)",

      /* EXTRA GLOSS */
      textShadow: `
        0 0 25px rgba(205,253,255,0.35),
        0 0 50px rgba(205,253,255,0.25),
        0 0 90px rgba(205,253,255,0.18)
      `,
    }}
  >

              <span>AETHEL</span>
              <span className="flex italic">
                <span>F</span>
                <span>L</span>
                <span>O</span>
                <span ref={wRef}>W</span>
              </span>
            </h1>
          </div>

        </div>
      </div>
    </footer>
  );
}
