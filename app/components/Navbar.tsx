"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

interface NavItem {
  label: string;
  sectionId: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Home", sectionId: "home" },
  { label: "Services", sectionId: "services" },
  { label: "Our Mission", sectionId: "mission" },
];

const ROUTE_ITEMS = [
  { label: "Features", href: "/features" },
  { label: "About Us", href: "/about" },
];

function scrollToSection(sectionId: string) {
  const el = document.getElementById(sectionId);
  el?.scrollIntoView({ behavior: "smooth" });
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  const router = useRouter();
  const pathname = usePathname();

  /* =======================
     OUTSIDE CLICK CLOSE
  ======================== */
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setMobileOpen(false);
      }
    }

    if (mobileOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => document.removeEventListener("click", handleClickOutside);
  }, [mobileOpen]);

  /* =======================
     ESC KEY CLOSE
  ======================== */
  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setMobileOpen(false);
    }
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  /* =======================
     SMART NAV CLICK
  ======================== */
  const handleNavClick = useCallback(
    (sectionId: string) => {
      setMobileOpen(false);

      if (pathname === "/") {
        scrollToSection(sectionId);
      } else {
        router.push(`/#${sectionId}`);
      }
    },
    [pathname, router]
  );

  const toggleMobileMenu = () => setMobileOpen((prev) => !prev);

  return (
    <header className="fixed top-6 left-1/2 -translate-x-1/2 w-full max-w-7xl px-6 z-50">
      <nav
        ref={navRef}
        className="relative rounded-3xl px-5 py-3 flex flex-wrap items-center justify-between gap-4 shadow-2xl"
        style={{
          backdropFilter: "blur(14px) saturate(150%)",
          WebkitBackdropFilter: "blur(14px) saturate(150%)",
        }}
      >
        {/* BACKGROUND */}
        <div
          className="absolute inset-0 rounded-3xl -z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, rgb(20 14 24 / 75%), rgb(64 59 73 / 69%) 45%, rgb(15 15 20 / 57%))",
            border: "1px solid rgba(255,255,255,0.15)",
            boxShadow: "0 10px 30px rgba(2,6,23,0.5)",
          }}
        />

        {/* LOGO */}
        <button
          onClick={() => handleNavClick("home")}
          className="flex items-center gap-3 group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-400 to-rose-400 flex items-center justify-center shadow group-hover:scale-105 transition-transform overflow-hidden">
            <img
              src="/logo.png"
              alt="Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="hidden min-[320px]:inline text-white font-semibold text-lg">
            AETHEL <span className="italic">FLOW</span>
          </span>
        </button>

        {/* DESKTOP NAV */}
        <ul className="hidden md:flex items-center gap-2">
          {NAV_ITEMS.map((item) => (
            <li key={item.sectionId}>
              <button
                onClick={() => handleNavClick(item.sectionId)}
                className="px-3 py-2 cursor-pointer rounded-xl text-white/90 hover:bg-white/10 transition-all hover:-translate-y-0.5"
              >
                {item.label}
              </button>
            </li>
          ))}

          {ROUTE_ITEMS.map((item) => (
            <li key={item.href}>
              <Link href={item.href}>
                <button
                  type="button"
                  className="px-3 py-2 cursor-pointer rounded-xl text-white/90 hover:bg-white/10 transition-all hover:-translate-y-0.5"
                >
                  {item.label}
                </button>
              </Link>
            </li>
          ))}
        </ul>

        {/* RIGHT */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleNavClick("contact")}
            className="hidden sm:block px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
          >
            Enquire here
          </button>

          {/* MOBILE TOGGLE (SVGs) */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
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

        {/* MOBILE MENU */}
        <div
          className={`w-full md:hidden transition-all duration-300 overflow-hidden ${
            mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="mt-4 rounded-2xl p-4 bg-white/10 border border-white/10">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.sectionId}
                onClick={() => handleNavClick(item.sectionId)}
                className="block w-full text-left py-2 px-3 rounded-lg text-white/90 hover:bg-white/10"
              >
                {item.label}
              </button>
            ))}

            {ROUTE_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="block py-2 px-3 rounded-lg text-white/90 hover:bg-white/10"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}
