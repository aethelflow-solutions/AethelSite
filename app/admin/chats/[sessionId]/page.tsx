"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Bot,
  User,
  Calendar,
  Monitor,
  Smartphone,
  Tablet,
  HelpCircle,
  RefreshCw,
  MessageSquare,
  Cpu,
  AlertCircle,
} from "lucide-react";
import { getChatSessionApi } from "@/_api/chat-bot.api";
import { ChatSession, DeviceType, Message } from "@/types/chat.type";

function formatDateTime(dateStr?: string | Date): string {
  if (!dateStr) return "—";
  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return "—";
    return date.toLocaleString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  } catch {
    return "—";
  }
}

function getDeviceIcon(deviceType?: DeviceType) {
  switch (deviceType) {
    case "mobile":
      return <Smartphone className="w-3.5 h-3.5 text-[#28a2fe]" />;
    case "tablet":
      return <Tablet className="w-3.5 h-3.5 text-[#28a2fe]" />;
    case "desktop":
      return <Monitor className="w-3.5 h-3.5 text-[#28a2fe]" />;
    default:
      return <HelpCircle className="w-3.5 h-3.5 text-gray-400" />;
  }
}

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

export default function AdminChatSessionDetailPage() {
  const params = useParams<{ sessionId: string }>();
  const router = useRouter();
  const sessionId = params?.sessionId;

  const [session, setSession] = useState<ChatSession | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadSessionDetails = useCallback(async () => {
    if (!sessionId) return;
    setIsLoading(true);
    setError(null);
    try {
      const [status, response] = await getChatSessionApi(sessionId);
      if (status && response?.data) {
        setSession(response.data);
      } else {
        setError(response?.message || "Failed to load chat session.");
      }
    } catch (err) {
      console.error("Error loading chat session:", err);
      setError("Unable to load chat session details.");
    } finally {
      setIsLoading(false);
    }
  }, [sessionId]);

  useEffect(() => {
    loadSessionDetails();
  }, [loadSessionDetails]);

  const messages: Message[] = [...(session?.messages ?? [])].sort(
    (a, b) => (a.order ?? 0) - (b.order ?? 0),
  );

  const totalTokens = messages.reduce(
    (sum, m) => sum + (m.tokenUsage?.total_tokens ?? 0),
    0,
  );

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] lg:h-[calc(100vh-5rem)] rounded-3xl bg-white border border-gray-200/80 shadow-sm overflow-hidden">
      {/* Top Full-Screen Header */}
      <div
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-6 py-4 text-white border-b border-white/10 shrink-0"
        style={{
          background: "linear-gradient(180deg, #05060a 0%, #1B1A1A 100%)",
        }}
      >
        <div className="flex items-center gap-3.5 min-w-0">
          <button
            type="button"
            onClick={() => router.push("/admin/chats")}
            title="Back to Chat Sessions"
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-base sm:text-lg font-semibold text-white truncate">
                {session?.title ? String(session.title) : "Untitled Chat"}
              </h1>
              {session?.deviceType && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-white/10 text-gray-200 capitalize border border-white/10">
                  {getDeviceIcon(session.deviceType)}
                  <span>{session.deviceType}</span>
                </span>
              )}
            </div>

            <div className="flex items-center gap-3 text-xs text-gray-400 mt-0.5 flex-wrap">
              <span className="font-mono text-[11px] text-gray-400">
                ID: {sessionId}
              </span>
              {session?.createdAt && (
                <span className="inline-flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-[#28a2fe]" />
                  {formatDateTime(session.createdAt)}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Right Stats & Refresh */}
        <div className="flex items-center gap-2.5 self-start sm:self-auto shrink-0">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 border border-white/10 text-xs text-gray-200">
            <MessageSquare className="w-3.5 h-3.5 text-[#28a2fe]" />
            <span>{messages.length} msgs</span>
          </div>

          {totalTokens > 0 && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 border border-white/10 text-xs text-gray-200">
              <Cpu className="w-3.5 h-3.5 text-[#7dd3fc]" />
              <span>{totalTokens} tokens</span>
            </div>
          )}

          <button
            type="button"
            onClick={loadSessionDetails}
            disabled={isLoading}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-colors disabled:opacity-50 cursor-pointer"
          >
            <RefreshCw
              className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`}
            />
            <span className="hidden sm:inline">Refresh</span>
          </button>
        </div>
      </div>

      {/* Full-Screen Messages Body */}
      <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-5 bg-gradient-to-b from-gray-50/70 via-white to-gray-50/50">
        {isLoading ? (
          <div className="max-w-4xl mx-auto space-y-4">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div
                key={idx}
                className={`h-20 w-2/3 rounded-2xl bg-gray-100 animate-pulse ${
                  idx % 2 === 1 ? "ml-auto" : ""
                }`}
              />
            ))}
          </div>
        ) : error ? (
          <div className="max-w-md mx-auto my-12 p-6 rounded-3xl bg-red-50 border border-red-200 text-center">
            <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />
            <h2 className="text-sm font-semibold text-red-800">{error}</h2>
          </div>
        ) : messages.length === 0 ? (
          <div className="max-w-md mx-auto my-12 p-8 text-center">
            <MessageSquare className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <h2 className="text-sm font-semibold text-gray-700">
              No messages in this session
            </h2>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto space-y-5">
            {messages.map((message) => {
              const isHuman = message.role === "human";
              const isFailed = message.status === "failed";

              return (
                <div
                  key={message._id}
                  className={`flex items-start gap-3 w-full ${
                    isHuman ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  {/* Avatar */}
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-xs ${
                      isHuman
                        ? "bg-[#28a2fe] text-white"
                        : "bg-[#1B1A1A] text-[#28a2fe]"
                    }`}
                  >
                    {isHuman ? (
                      <User className="w-4 h-4" />
                    ) : (
                      <Bot className="w-4 h-4" />
                    )}
                  </div>

                  {/* Bubble + Admin Metadata */}
                  <div
                    className={`flex flex-col max-w-[82%] sm:max-w-[75%] ${
                      isHuman ? "items-end" : "items-start"
                    }`}
                  >
                    <div
                      className={`px-5 py-3.5 rounded-2xl text-sm leading-relaxed shadow-2xs ${
                        isHuman
                          ? "bg-[#1B1A1A] text-white rounded-tr-xs"
                          : isFailed
                          ? "bg-red-50 border border-red-200 text-red-800 rounded-tl-xs"
                          : "bg-white border border-gray-200/90 text-gray-800 rounded-tl-xs"
                      }`}
                    >
                      <div className="break-words">
                        {renderFormattedContent(message.content) || (
                          <span className="italic opacity-60">
                            {message.error || "No content"}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Footer Meta */}
                    <div
                      className={`flex items-center gap-3 mt-1.5 px-1 text-[11px] text-gray-400 flex-wrap ${
                        isHuman ? "flex-row-reverse" : "flex-row"
                      }`}
                    >
                      <span className="font-medium uppercase text-[10px] text-gray-500">
                        {isHuman ? "Visitor" : "AI Assistant"}
                      </span>

                      {message.timestamp && (
                        <span>{formatDateTime(message.timestamp)}</span>
                      )}

                      {message.tokenUsage?.total_tokens ? (
                        <span className="px-2 py-0.5 rounded-md bg-gray-100 text-gray-600 text-[10px] font-medium">
                          {message.tokenUsage.total_tokens} tokens (in:{" "}
                          {message.tokenUsage.input_tokens}, out:{" "}
                          {message.tokenUsage.output_tokens})
                        </span>
                      ) : null}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
