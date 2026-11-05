"use client";

import React from "react";
import { Sparkles } from "lucide-react";

interface ChatSuggestionsProps {
  suggestions: string[];
  onSelect: (suggestion: string) => void;
  disabled?: boolean;
}

export default function ChatSuggestions({
  suggestions,
  onSelect,
  disabled = false,
}: ChatSuggestionsProps) {
  if (!suggestions.length) return null;

  return (
    <div className="px-4 py-3 bg-gray-50/90 border-t border-gray-100 shrink-0">
      <div className="flex items-center gap-1.5 mb-2 text-[11px] font-medium text-gray-500">
        <Sparkles className="w-3 h-3 text-[#28a2fe]" />
        <span>Suggested questions</span>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto sm:flex-wrap sm:overflow-visible no-scrollbar pb-0.5">
        {suggestions.map((suggestion) => (
          <button
            key={suggestion}
            type="button"
            disabled={disabled}
            onClick={() => onSelect(suggestion)}
            className="shrink-0 px-3 py-1.5 rounded-full text-xs font-medium bg-white text-gray-800 border border-gray-200 hover:border-[#1B1A1A] hover:bg-[#1B1A1A] hover:text-white transition-all shadow-2xs disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
}
