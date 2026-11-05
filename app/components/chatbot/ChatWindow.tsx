"use client";

import React, { useState } from "react";
import { ChatSession, Message } from "@/types/chat.type";
import ChatHeader from "./ChatHeader";
import ChatMessageList from "./ChatMessageList";
import ChatSuggestions from "./ChatSuggestions";
import ChatInput from "./ChatInput";

interface ChatWindowProps {
  isOpen: boolean;
  session: ChatSession | null;
  suggestions: string[];
  isProcessing: boolean;
  onSendMessage: (content: string) => void;
  onRetryMessage?: (message: Message) => void;
  onResetChat: () => void;
  onClose: () => void;
}

export default function ChatWindow({
  isOpen,
  session,
  suggestions,
  isProcessing,
  onSendMessage,
  onRetryMessage,
  onResetChat,
  onClose,
}: ChatWindowProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!isOpen) return null;

  const messages = session?.messages ?? [];
  const isMessagesEmpty = messages.length === 0;

  return (
    <>
      {/* Backdrop when expanded on desktop or on small mobile screens */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/25 backdrop-blur-[1px] z-[1660] transition-opacity duration-300 ${
          isExpanded ? "opacity-100" : "sm:hidden opacity-100"
        }`}
        aria-hidden="true"
      />

      {/* Right-Side Chat Container */}
      <aside
        aria-label="Aethel Flow AI Chat Interface"
        className={`fixed z-[1700] flex flex-col bg-white overflow-hidden shadow-[0_20px_70px_rgba(15,23,42,0.28)] border border-gray-200/80 transition-all duration-300 ease-out ${
          isExpanded
            ? "top-0 right-0 bottom-0 w-full sm:w-[460px] md:w-[500px] h-full rounded-none sm:rounded-l-3xl"
            : "right-3 sm:right-6 bottom-3 sm:bottom-24 w-[calc(100vw-1.5rem)] sm:w-[390px] md:w-[410px] h-[78vh] sm:h-[600px] max-h-[calc(100vh-7rem)] rounded-3xl"
        }`}
      >
        <ChatHeader
          title={session?.title ? String(session.title) : "Aethel Flow AI"}
          isProcessing={isProcessing}
          isExpanded={isExpanded}
          onToggleExpand={() => setIsExpanded((prev) => !prev)}
          onResetChat={onResetChat}
          onClose={onClose}
        />

        <ChatMessageList
          messages={messages}
          sessionDate={session?.date}
          onRetry={onRetryMessage}
        />

        {isMessagesEmpty && (
          <ChatSuggestions
            suggestions={suggestions}
            onSelect={onSendMessage}
            disabled={isProcessing}
          />
        )}

        <ChatInput onSendMessage={onSendMessage} disabled={isProcessing} />
      </aside>
    </>
  );
}
