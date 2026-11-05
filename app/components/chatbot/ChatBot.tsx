"use client";

import React, { useState, useCallback, useEffect } from "react";
import { ChatSession, DeviceType, Message } from "@/types/chat.type";
import ChatTriggerButton from "./ChatTriggerButton";
import ChatWindow from "./ChatWindow";
import {
  INITIAL_CHAT_SESSION,
  QUICK_SUGGESTIONS,
  STATIC_BOT_REPLIES,
  DEFAULT_STATIC_REPLY,
} from "./staticChatData";

export interface ChatInfoState {
  isOpen: boolean;
  isProcessing: boolean;
}

function detectDeviceType(): DeviceType {
  if (typeof window === "undefined") return "unknown";
  const width = window.innerWidth;
  if (width < 640) return "mobile";
  if (width < 1024) return "tablet";
  return "desktop";
}

export default function ChatBot() {
  const [info, setInfo] = useState<ChatInfoState>({
    isOpen: false,
    isProcessing: false,
  });

  const [session, setSession] = useState<ChatSession | null>(
    INITIAL_CHAT_SESSION,
  );

  useEffect(() => {
    setSession((prev) =>
      prev
        ? {
            ...prev,
            deviceType: detectDeviceType(),
          }
        : null,
    );
  }, []);

  const handleToggleOpen = useCallback(() => {
    setInfo((prev) => ({
      ...prev,
      isOpen: !prev.isOpen,
    }));
  }, []);

  const handleClose = useCallback(() => {
    setInfo((prev) => ({
      ...prev,
      isOpen: false,
    }));
  }, []);

  const handleResetChat = useCallback(() => {
    const now = new Date();
    setInfo((prev) => ({
      ...prev,
      isProcessing: false,
    }));
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
      if (!content.trim() || info.isProcessing) return;

      const now = new Date();
      const humanMsgId = `msg_human_${Date.now()}`;
      const aiMsgId = `msg_ai_${Date.now() + 1}`;

      const existingMessages = session?.messages ?? [];
      const currentMaxOrder = existingMessages.reduce(
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

      setInfo((prev) => ({
        ...prev,
        isProcessing: true,
      }));

      setSession((prev) => {
        if (!prev) {
          return {
            date: now,
            deviceType: detectDeviceType(),
            title: "Aethel Flow AI Support",
            messages: [humanMessage, pendingAiMessage],
            createdAt: now,
            updatedAt: now,
          };
        }
        return {
          ...prev,
          updatedAt: now,
          messages: [...prev.messages, humanMessage, pendingAiMessage],
        };
      });

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

        setSession((prev) => {
          if (!prev) return null;
          return {
            ...prev,
            updatedAt: completedTime,
            messages: prev.messages.map((m) =>
              m._id === aiMsgId ? completedAiMessage : m,
            ),
          };
        });

        setInfo((prev) => ({
          ...prev,
          isProcessing: false,
        }));
      }, 900);
    },
    [info.isProcessing, session],
  );

  return (
    <>
      <ChatTriggerButton isOpen={info.isOpen} onClick={handleToggleOpen} />

      <ChatWindow
        isOpen={info.isOpen}
        session={session}
        suggestions={QUICK_SUGGESTIONS}
        isProcessing={info.isProcessing}
        onSendMessage={handleSendMessage}
        onResetChat={handleResetChat}
        onClose={handleClose}
      />
    </>
  );
}
