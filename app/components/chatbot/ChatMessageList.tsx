"use client";

import React, { useEffect, useRef } from "react";
import { Message } from "@/types/chat.type";
import ChatMessageItem from "./ChatMessageItem";
import { Sparkles } from "lucide-react";

interface ChatMessageListProps {
  messages: Message[];
  sessionDate?: Date;
  onRetry?: (message: Message) => void;
}

export default function ChatMessageList({
  messages,
  sessionDate,
  onRetry,
}: ChatMessageListProps) {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sortedMessages = [...messages].sort(
    (a, b) => (a.order ?? 0) - (b.order ?? 0)
  );

  const formattedSessionDate = sessionDate
    ? new Date(sessionDate).toLocaleDateString([], {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Today";

  return (
    <div className="flex-1 overflow-y-auto px-4 py-5 space-y-4 bg-gradient-to-b from-gray-50/70 via-white to-gray-50/50">
      {/* Top Session Intro Card */}
      <div className="flex flex-col items-center text-center mb-4">
        <span className="px-3 py-1 rounded-full text-[11px] font-medium bg-gray-100 text-gray-500 border border-gray-200/70 mb-3">
          {formattedSessionDate}
        </span>

        <div className="w-full p-3.5 rounded-2xl bg-[#f8fafc] border border-gray-200/80 flex items-center gap-3 text-left">
          <div className="w-9 h-9 rounded-xl bg-[#1B1A1A] shadow-xs flex items-center justify-center shrink-0 text-[#28a2fe]">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="text-xs text-gray-600 leading-relaxed">
            <span className="font-semibold text-gray-900 block">
              Aethel Flow Intelligent Assistant
            </span>
            Ask anything about our AI automation, custom software, or digital
            transformation services.
          </div>
        </div>
      </div>

      {/* Messages */}
      {sortedMessages.map((msg) => (
        <ChatMessageItem key={msg._id} message={msg} onRetry={onRetry} />
      ))}

      <div ref={bottomRef} />
    </div>
  );
}
