"use client";

import React from "react";
import { RotateCcw, X, Sparkles, Maximize2, Minimize2 } from "lucide-react";

interface ChatHeaderProps {
  title?: string;
  isProcessing?: boolean;
  isExpanded?: boolean;
  onToggleExpand?: () => void;
  onResetChat: () => void;
  onClose: () => void;
}

export default function ChatHeader({
  title = "Aethel Flow AI",
  isProcessing = false,
  isExpanded = false,
  onToggleExpand,
  onResetChat,
  onClose,
}: ChatHeaderProps) {
  return (
    <div
      className="relative flex items-center justify-between px-5 py-4 text-white border-b border-white/10 select-none overflow-hidden shrink-0"
      style={{
        background: "linear-gradient(180deg, #05060a 0%, #1B1A1A 100%)",
      }}
    >
      {/* Ambient sky-blue glow matching FeaturesPage & Hero */}
      <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-[#28a2fe]/15 blur-2xl pointer-events-none" />

      {/* Left: Brand Avatar + Title & Status */}
      <div className="relative z-10 flex items-center gap-3.5 min-w-0">
        <div className="relative shrink-0">
          <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 p-0.5 shadow-md overflow-hidden">
            <div className="w-full h-full rounded-[10px] bg-black flex items-center justify-center overflow-hidden">
              <img
                src="/logo.png"
                alt="Aethel Flow AI"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#0d0d11]" />
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <h3 className="text-sm sm:text-base font-semibold text-white truncate">
              {title}
            </h3>
            <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md text-[10px] font-medium bg-[#28a2fe]/15 text-[#7dd3fc] border border-[#28a2fe]/25">
              <Sparkles className="w-2.5 h-2.5" />
              AI
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-gray-300/85">
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isProcessing ? "bg-[#28a2fe] animate-pulse" : "bg-emerald-400"
              }`}
            />
            <span className="truncate">
              {isProcessing ? "Thinking..." : "Online • Instant answers"}
            </span>
          </div>
        </div>
      </div>

      {/* Right: Controls */}
      <div className="relative z-10 flex items-center gap-1">
        <button
          type="button"
          onClick={onResetChat}
          title="Start new chat"
          aria-label="Start new chat"
          className="p-2 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        {onToggleExpand && (
          <button
            type="button"
            onClick={onToggleExpand}
            title={isExpanded ? "Compact view" : "Expand drawer"}
            aria-label={isExpanded ? "Compact view" : "Expand drawer"}
            className="hidden sm:inline-flex p-2 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            {isExpanded ? (
              <Minimize2 className="w-4 h-4" />
            ) : (
              <Maximize2 className="w-4 h-4" />
            )}
          </button>
        )}

        <button
          type="button"
          onClick={onClose}
          title="Close chat"
          aria-label="Close chat"
          className="p-2 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
