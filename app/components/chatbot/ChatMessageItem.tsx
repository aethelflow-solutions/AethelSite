"use client";

import React, { useState } from "react";
import { Message } from "@/types/chat.type";
import { Bot, User, Copy, Check, AlertCircle, RefreshCw } from "lucide-react";

interface ChatMessageItemProps {
  message: Message;
  onRetry?: (message: Message) => void;
}

function formatTime(timestamp?: string): string {
  if (!timestamp) return "";
  try {
    const date = new Date(timestamp);
    if (isNaN(date.getTime())) return "";
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  } catch {
    return "";
  }
}

/**
 * Lightweight inline formatter for **bold** text and line breaks
 */
function renderFormattedContent(content?: string) {
  if (!content) return null;

  const lines = content.split("\n");
  return lines.map((line, lineIdx) => {
    const parts = line.split(/(\*\*.*?\*\*)/g);
    return (
      <React.Fragment key={lineIdx}>
        {parts.map((part, partIdx) => {
          if (part.startsWith("**") && part.endsWith("**")) {
            return (
              <strong key={partIdx} className="font-semibold">
                {part.slice(2, -2)}
              </strong>
            );
          }
          return <span key={partIdx}>{part}</span>;
        })}
        {lineIdx < lines.length - 1 && <br />}
      </React.Fragment>
    );
  });
}

export default function ChatMessageItem({
  message,
  onRetry,
}: ChatMessageItemProps) {
  const [copied, setCopied] = useState(false);
  const isHuman = message.role === "human";
  const isProcessing =
    message.status === "processing" && !message.content?.trim();
  const isFailed = message.status === "failed";

  const handleCopy = async () => {
    if (!message.content) return;
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // ignore clipboard errors
    }
  };

  return (
    <div
      className={`group flex items-end gap-2.5 w-full animate-fadeIn ${
        isHuman ? "flex-row-reverse" : "flex-row"
      }`}
      style={{ animationDuration: "0.28s", animationDelay: "0s" }}
    >
      {/* Avatar */}
      <div
        className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-xs ${
          isHuman
            ? "bg-[#28a2fe] text-white"
            : "bg-[#1B1A1A] text-[#28a2fe] border border-black/10"
        }`}
      >
        {isHuman ? (
          <User className="w-4 h-4" />
        ) : (
          <Bot className="w-4 h-4 text-[#28a2fe]" />
        )}
      </div>

      {/* Bubble Container */}
      <div
        className={`flex flex-col max-w-[80%] ${
          isHuman ? "items-end" : "items-start"
        }`}
      >
        <div
          className={`relative px-4 py-3 rounded-2xl text-[13.5px] leading-relaxed shadow-2xs transition-all ${
            isHuman
              ? "bg-[#1B1A1A] text-white rounded-br-xs"
              : isFailed
              ? "bg-red-50 border border-red-200 text-red-800 rounded-bl-xs"
              : "bg-white border border-gray-200/90 text-gray-800 rounded-bl-xs"
          }`}
        >
          {/* Processing State */}
          {isProcessing ? (
            <div className="flex items-center gap-1.5 py-1 px-1">
              <span className="w-2 h-2 rounded-full bg-[#1B1A1A] animate-bounce [animation-delay:-0.3s]" />
              <span className="w-2 h-2 rounded-full bg-[#28a2fe] animate-bounce [animation-delay:-0.15s]" />
              <span className="w-2 h-2 rounded-full bg-sky-300 animate-bounce" />
              <span className="ml-1.5 text-xs text-gray-400 font-medium">
                Generating response...
              </span>
            </div>
          ) : isFailed ? (
            /* Failed State */
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-1.5 text-red-600 font-medium text-xs">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{message.error || "Failed to get a response."}</span>
              </div>
              {message.content && (
                <div className="text-gray-700 text-xs opacity-80">
                  {renderFormattedContent(message.content)}
                </div>
              )}
              {onRetry && (
                <button
                  type="button"
                  onClick={() => onRetry(message)}
                  className="inline-flex items-center gap-1 self-start text-xs font-medium text-red-700 hover:text-red-900 bg-red-100 hover:bg-red-200/80 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3" />
                  Retry
                </button>
              )}
            </div>
          ) : (
            /* Completed Content */
            <div className="break-words">
              {renderFormattedContent(message.content)}
            </div>
          )}
        </div>

        {/* Footer Meta: Timestamp & Copy Action */}
        {!isProcessing && (
          <div
            className={`flex items-center gap-2 mt-1 px-1 text-[11px] text-gray-400 ${
              isHuman ? "flex-row-reverse" : "flex-row"
            }`}
          >
            {message.timestamp && <span>{formatTime(message.timestamp)}</span>}

            {!isHuman && message.content && !isFailed && (
              <button
                type="button"
                onClick={handleCopy}
                title="Copy message"
                aria-label="Copy message"
                className="opacity-0 group-hover:opacity-100 inline-flex items-center gap-1 text-gray-400 hover:text-gray-700 transition-opacity cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-500" />
                    <span className="text-[10px] text-emerald-600">Copied</span>
                  </>
                ) : (
                  <Copy className="w-3 h-3" />
                )}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
