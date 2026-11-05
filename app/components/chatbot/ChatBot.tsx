"use client";

import React, { useState, useCallback, useEffect } from "react";
import { ChatSession, DeviceType, Message } from "@/types/chat.type";
import ChatTriggerButton from "./ChatTriggerButton";
import ChatWindow from "./ChatWindow";
import {
  INITIAL_CHAT_SESSION,
  INITIAL_MESSAGES,
  QUICK_SUGGESTIONS,
  STATIC_BOT_REPLIES,
  DEFAULT_STATIC_REPLY,
} from "./staticChatData";

function detectDeviceType(): DeviceType {
  if (typeof window === "undefined") return "unknown";
  const width = window.innerWidth;
  if (width < 640) return "mobile";
  if (width < 1024) return "tablet";
  return "desktop";
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [session, setSession] = useState<ChatSession>(INITIAL_CHAT_SESSION);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    setSession((prev) => ({
      ...prev,
      deviceType: detectDeviceType(),
    }));
  }, []);

  const handleToggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleResetChat = useCallback(() => {
    const now = new Date();
    setIsProcessing(false);
    setSession({
      date: now,
      deviceType: detectDeviceType(),
      title: "Aethel Flow AI Support",
      messages: [],
      createdAt: now,
      updatedAt: now,
    });
  }, []);

  const handleSendMessage = useCallback(
    (content: string) => {
      if (!content.trim() || isProcessing) return;

      const now = new Date();
      const humanMsgId = `msg_human_${Date.now()}`;
      const aiMsgId = `msg_ai_${Date.now() + 1}`;

      const currentMaxOrder = session.messages.reduce(
        (max, m) => Math.max(max, m.order ?? 0),
        0,
      );

      const humanMessage: Message = {
        _id: humanMsgId,
        content: content.trim(),
        role: "human",
        timestamp: now.toISOString(),
        status: "completed",
        order: currentMaxOrder + 1,
      };

      const pendingAiMessage: Message = {
        _id: aiMsgId,
        content: "",
        role: "ai",
        timestamp: new Date(now.getTime() + 100).toISOString(),
        status: "processing",
        order: currentMaxOrder + 2,
      };

      setIsProcessing(true);
      setSession((prev) => ({
        ...prev,
        updatedAt: now,
        messages: [...prev.messages, humanMessage, pendingAiMessage],
      }));

      // Static simulation (will be replaced with real API call later)
      setTimeout(() => {
        const replyText =
          STATIC_BOT_REPLIES[content.trim()] || DEFAULT_STATIC_REPLY;
        const completedTime = new Date();

        const completedAiMessage: Message = {
          _id: aiMsgId,
          content: replyText,
          role: "ai",
          timestamp: completedTime.toISOString(),
          status: "completed",
          order: currentMaxOrder + 2,
          metadata: {
            mode: "static_preview",
            model: "aethel-ai-v1",
          },
          tokenUsage: {
            input_tokens: content.trim().split(/\s+/).length * 2,
            output_tokens: replyText.split(/\s+/).length * 2,
            total_tokens:
              (content.trim().split(/\s+/).length +
                replyText.split(/\s+/).length) *
              2,
          },
        };

        setSession((prev) => ({
          ...prev,
          updatedAt: completedTime,
          messages: prev.messages.map((m) =>
            m._id === aiMsgId ? completedAiMessage : m,
          ),
        }));
        setIsProcessing(false);
      }, 900);
    },
    [isProcessing, session.messages],
  );

  return (
    <>
      <ChatTriggerButton isOpen={isOpen} onClick={handleToggleOpen} />

      <ChatWindow
        isOpen={isOpen}
        session={session}
        suggestions={QUICK_SUGGESTIONS}
        isProcessing={isProcessing}
        onSendMessage={handleSendMessage}
        onResetChat={handleResetChat}
        onClose={handleClose}
      />
    </>
  );
}
