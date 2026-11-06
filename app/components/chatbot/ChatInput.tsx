"use client";

import React, { useState, useRef } from "react";
import { SendHorizontal } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (content: string) => void;
  disabled?: boolean;
}

export default function ChatInput({
  onSendMessage,
  disabled = false,
}: ChatInputProps) {
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = inputValue.trim();
    if (!trimmed || disabled) return;
    onSendMessage(trimmed);
    setInputValue("");
    inputRef.current?.focus();
  };

  return (
    <div className="p-3.5 bg-white border-t border-gray-200/80 shrink-0">
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-2xl px-3.5 py-2 transition-all"
      >
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          disabled={disabled}
          placeholder={
            disabled ? "Waiting for AI response..." : "Type your message..."
          }
          style={{ outline: "none", boxShadow: "none" }}
          className="flex-1 bg-transparent text-sm text-gray-800 placeholder-gray-400 border-none outline-none focus:outline-none focus-visible:!outline-none focus:ring-0 disabled:opacity-60"
        />

        <button
          type="submit"
          disabled={!inputValue.trim() || disabled}
          aria-label="Send message"
          className="flex items-center justify-center w-9 h-9 rounded-xl bg-[#1B1A1A] hover:bg-black text-white shadow-xs disabled:opacity-35 disabled:pointer-events-none transition-all cursor-pointer shrink-0"
        >
          <SendHorizontal className="w-4 h-4" />
        </button>
      </form>

      <div className="mt-2 flex items-center justify-center text-[10.5px] text-gray-400">
        <span>Powered by</span>
        <span className="font-semibold text-gray-700 ml-1">
          Aethel Flow AI
        </span>
      </div>
    </div>
  );
}
