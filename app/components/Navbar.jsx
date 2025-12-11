import React, { useEffect, useRef, useState } from "react";

// GlassyPurpleNavbar.jsx
// Single-file React component (TailwindCSS required)
// Default export: GlassyPurpleNavbar

export default function Navbar() {
  const [moreOpen, setMoreOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const moreRef = useRef(null);

  useEffect(() => {
    function onDocClick(e) {
      if (moreRef.current && !moreRef.current.contains(e.target)) {
        setMoreOpen(false);
      }
    }
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  return (
    <header className="fixed top-6 left-1/2 transform -translate-x-1/2 w-full max-w-5xl z-50">
      <nav
        className={"rounded-3xl px-5 py-3 flex items-center justify-between gap-4 shadow-2xl"}
        style={{
          // ensure backdrop-filter works cross-browser
          WebkitBackdropFilter: "blur(14px) saturate(150%)",
          backdropFilter: "blur(14px) saturate(150%)",
        }}
      >
        {/* Background visual: gradient purple that is mostly opaque but keeps blur working */}
        <div
          aria-hidden
          className="absolute inset-0 rounded-3xl -z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, rgba(89, 28, 135, 0.746), rgba(124, 58, 237, 0.689) 45%, rgba(78, 70, 229, 0.575))",
            border: "1px solid rgba(255, 255, 255, 0.154)",
            boxShadow: "0 10px 30px rgba(2,6,23,0.5)",
            WebkitBackdropFilter: "blur(14px) saturate(150%)",
            backdropFilter: "blur(14px) saturate(150%)",
          }}
        />

        {/* Left: Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-rose-400 flex items-center justify-center text-white font-semibold shadow">G</div>
          <div onClick={() => {
              document
                .getElementById("home")
                ?.scrollIntoView({ behavior: "smooth" });
            }}>
            <a href="" className="font-lilex text-white font-semibold text-lg">Aethel Flow</a>
          </div>
        </div>

        {/* Middle: Nav Links (desktop) */}
        <ul className="hidden md:flex items-center gap-2">
          <li onClick={() => {
              document
                .getElementById("home")
                ?.scrollIntoView({ behavior: "smooth" });
            }} className="cursor-pointer px-3 py-2 rounded-xl text-white/90 hover:bg-white/6 transition-pop">Home</li>
          <li onClick={() => {
              document
                .getElementById("services")
                ?.scrollIntoView({ behavior: "smooth" });
            }} className="cursor-pointer px-3 py-2 rounded-xl text-white/90 hover:bg-white/6 transition-pop">Services</li>
          <li onClick={() => {
              document
                .getElementById("mission")
                ?.scrollIntoView({ behavior: "smooth" });
            }} className="cursor-pointer px-3 py-2 rounded-xl text-white/90 hover:bg-white/6 transition-pop">Our Mission</li>

          {/* More popup */}
          
        </ul>

        {/* Right: actions + mobile button */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-3">
            {/* <button className="px-3 py-2 rounded-lg text-white/90 hover:bg-white/6">Sign in</button> */}
            <button onClick={() => {
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" });
            }} className="px-3 py-2 rounded-full bg-white/8 text-white font-medium cursor-pointer">Enquire here</button>
          </div>

          <button
            className="sm:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg bg-white/6 text-white"
            aria-expanded={mobileOpen}
            aria-label="Open mobile menu"
            onClick={() => setMobileOpen((s) => !s)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile panel */}
        <div className={`w-full mt-4 ${mobileOpen ? "block" : "hidden"}`}>
          <div className="rounded-2xl p-4 bg-gradient-to-b from-white/6 to-white/3 border border-white/6">
            <a onClick={() => {
              document
                .getElementById("home")
                ?.scrollIntoView({ behavior: "smooth" });
            }} href="" className="block py-2 px-3 rounded-lg text-white/90 hover:bg-white/4">Home</a>
            <a onClick={() => {
              document
                .getElementById("services")
                ?.scrollIntoView({ behavior: "smooth" });
            }} href="" className="block py-2 px-3 rounded-lg text-white/90 hover:bg-white/4">Services</a>
            <a onClick={() => {
              document
                .getElementById("mission")
                ?.scrollIntoView({ behavior: "smooth" });
            }} href="" className="block py-2 px-3 rounded-lg text-white/90 hover:bg-white/4">Our Mission</a>
            <a onClick={() => {
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" });
            }} href="" className="block py-2 px-3 rounded-lg text-white/90 hover:bg-white/4">Contact Us</a>
            
          </div>
        </div>

      </nav>

      {/* Extra local styles for subtle pop animation */}
      <style>{`
        .transition-pop { transition: transform 180ms cubic-bezier(.2,.9,.3,1), box-shadow 180ms; }
        .transition-pop:hover { transform: translateY(-6px) scale(1.02); }
      `}</style>
    </header>
  );
}

