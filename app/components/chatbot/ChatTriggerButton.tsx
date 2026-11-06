"use client";

import React from "react";
import { Bot, X, Sparkles } from "lucide-react";

interface ChatTriggerButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export default function ChatTriggerButton({
  isOpen,
  onClick,
}: ChatTriggerButtonProps) {
  return (
    <div className="fixed bottom-24 right-6 z-[1650] flex items-center gap-3 group">
      {/* Hover Label Pill (only when chat is closed) */}
      {!isOpen && (
        <div
          onClick={onClick}
          className="cursor-pointer hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#1B1A1A]/95 text-white text-xs font-medium border border-white/15 shadow-lg backdrop-blur-md opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#28a2fe]" />
          <span>Ask Aethel AI</span>
        </div>
      )}

      {/* Main Trigger Button */}
      <button
        type="button"
        onClick={onClick}
        aria-label={isOpen ? "Close AI Chatbot" : "Open AI Chatbot"}
        className={`relative flex items-center justify-center w-14 h-14 rounded-full cursor-pointer transition-all duration-300 shadow-[0_8px_28px_rgba(40,162,254,0.35)] focus:outline-none ${
          isOpen
            ? "bg-[#1B1A1A] text-white hover:bg-black rotate-90 scale-95"
            : "bg-[#1B1A1A] border border-white/15 text-white hover:bg-black hover:scale-108"
        }`}
      >
        {/* Subtle sky-blue outer glow ring when closed */}
        {!isOpen && (
          <span className="absolute -inset-1 rounded-full bg-[#28a2fe] opacity-25 blur-md group-hover:opacity-50 transition-opacity duration-300 pointer-events-none" />
        )}

        <span className="relative z-10 flex items-center justify-center">
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Bot className="w-7 h-7 text-[#28a2fe] drop-shadow" />
          )}
        </span>
      </button>
    </div>
  );
}
