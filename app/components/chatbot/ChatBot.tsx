"use client";

import React, { useState, useCallback, useEffect } from "react";
import { ChatSession, DeviceType, Message } from "@/types/chat.type";
import {
  createNewChatSessionApi,
  getChatSessionApi,
} from "@/_api/chat-bot.api";
import {
  getSessionToken,
  setSessionToken,
} from "@/helpers/sessionStorage.helper";
import ChatTriggerButton from "./ChatTriggerButton";
import ChatWindow from "./ChatWindow";
import {
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

  const [session, setSession] = useState<ChatSession | null>(null);

  /**
   * Fetch existing session by ID
   */
  const fetchExistingSession = useCallback(async (sessionId: string) => {
    setInfo((prev) => ({ ...prev, isProcessing: true }));
    try {
      const [status, response] = await getChatSessionApi(sessionId);
      if (status && response?.data) {
        setSession(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch chat session:", error);
    } finally {
      setInfo((prev) => ({ ...prev, isProcessing: false }));
    }
  }, []);

  /**
   * Create a new chat session & store its _id in sessionStorage
   */
  const createNewSession = useCallback(async () => {
    setInfo((prev) => ({ ...prev, isProcessing: true }));
    try {
      const [status, response] = await createNewChatSessionApi({});
      if (status && response?.data) {
        if (response.data._id) {
          setSessionToken(response.data._id);
        }
        setSession(response.data);
      }
    } catch (error) {
      console.error("Failed to create new chat session:", error);
    } finally {
      setInfo((prev) => ({ ...prev, isProcessing: false }));
    }
  }, []);

  /**
   * 1st Render: Check if session ID exists in sessionStorage and fetch session details
   */
  useEffect(() => {
    const existingSessionId = getSessionToken();
    if (existingSessionId) {
      fetchExistingSession(existingSessionId);
    }
  }, []);

  /**
   * On clicking the bot: toggle open, and if no session details exist, create a new session
   */
  const handleToggleOpen = useCallback(async () => {
    const nextIsOpen = !info.isOpen;

    setInfo((prev) => ({
      ...prev,
      isOpen: nextIsOpen,
    }));

    if (nextIsOpen && !session && !info.isProcessing) {
      await createNewSession();
    }
  }, [info.isOpen, info.isProcessing, session, createNewSession]);

  const handleClose = useCallback(() => {
    setInfo((prev) => ({
      ...prev,
      isOpen: false,
    }));
  }, []);

  const handleResetChat = useCallback(async () => {
    await createNewSession();
  }, [createNewSession]);

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
            _id: getSessionToken() || `session_${Date.now()}`,
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

      // Static simulation (until message-sending API is integrated)
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
