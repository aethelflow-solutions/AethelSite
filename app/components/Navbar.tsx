"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";

interface NavItem {
  label: string;
  sectionId: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Home", sectionId: "home" },
  { label: "Services", sectionId: "services" },
  { label: "Our Mission", sectionId: "mission" },
];

function scrollToSection(sectionId: string): void {
  const element = document.getElementById(sectionId);
  element?.scrollIntoView({ behavior: "smooth" });
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  // Close mobile menu when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setMobileOpen(false);
      }
    }

    if (mobileOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [mobileOpen]);

  // Close mobile menu on escape key
  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setMobileOpen(false);
      }
    }

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  const handleNavClick = useCallback((sectionId: string) => {
    scrollToSection(sectionId);
    setMobileOpen(false);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setMobileOpen((prev) => !prev);
  }, []);

  return (
    <header className="fixed top-6 left-1/2 -translate-x-1/2 w-full max-w-7xl px-6 z-50">
      <nav
        ref={navRef}
        className="relative rounded-3xl px-5 py-3 flex flex-wrap items-center justify-between gap-4 shadow-2xl"
        style={{
          WebkitBackdropFilter: "blur(14px) saturate(150%)",
          backdropFilter: "blur(14px) saturate(150%)",
        }}
        aria-label="Main navigation"
      >
        {/* Background gradient */}
        <div
          aria-hidden="true"
          className="absolute inset-0 rounded-3xl -z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, rgba(89, 28, 135, 0.746), rgba(124, 58, 237, 0.689) 45%, rgba(78, 70, 229, 0.575))",
            border: "1px solid rgba(255, 255, 255, 0.154)",
            boxShadow: "0 10px 30px rgba(2, 6, 23, 0.5)",
          }}
        />

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 group"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick("home");
          }}
          aria-label="Aethel Flow - Go to homepage"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-rose-400 flex items-center justify-center text-white font-semibold shadow transition-transform group-hover:scale-105">
            A
          </div>
          <span className="text-white font-semibold text-lg">Aethel Flow</span>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-2" role="menubar">
          {NAV_ITEMS.map((item) => (
            <li key={item.sectionId} role="none">
              <button
                role="menuitem"
                onClick={() => handleNavClick(item.sectionId)}
                className="cursor-pointer px-3 py-2 rounded-xl text-white/90 hover:bg-white/10 transition-all duration-200 hover:-translate-y-0.5"
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Right side actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleNavClick("contact")}
            className="hidden sm:block px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium cursor-pointer transition-colors duration-200"
          >
            Enquire here
          </button>

          {/* Mobile menu button */}
          <button
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={toggleMobileMenu}
          >
            {mobileOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu panel */}
        <div
          id="mobile-menu"
          className={`w-full transition-all duration-300 overflow-hidden md:hidden ${
            mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
          aria-hidden={!mobileOpen}
        >
          <div className="rounded-2xl p-4 mt-4 bg-gradient-to-b from-white/10 to-white/5 border border-white/10">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.sectionId}
                onClick={() => handleNavClick(item.sectionId)}
                className="block w-full text-left py-2 px-3 rounded-lg text-white/90 hover:bg-white/10 transition-colors"
                tabIndex={mobileOpen ? 0 : -1}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => handleNavClick("contact")}
              className="block w-full text-left py-2 px-3 rounded-lg text-white/90 hover:bg-white/10 transition-colors"
              tabIndex={mobileOpen ? 0 : -1}
            >
              Contact Us
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
