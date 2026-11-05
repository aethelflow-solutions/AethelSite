"use client";

import React, { useState, useCallback, useEffect } from "react";
import { ChatSession, DeviceType, Message } from "@/types/chat.type";
import {
  createNewChatSessionApi,
  getChatSessionApi,
  sendMessageApi,
} from "@/_api/chat-bot.api";
import {
  getSessionToken,
  setSessionToken,
} from "@/helpers/sessionStorage.helper";
import ChatTriggerButton from "./ChatTriggerButton";
import ChatWindow from "./ChatWindow";
import { QUICK_SUGGESTIONS } from "./staticChatData";

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
      const [status, response, statusCode] = await getChatSessionApi(sessionId);
      if (status && response?.data) {
        setSession(response.data);
      }
      if (statusCode === 404 || statusCode === 500) {
        console.warn(
          `Session with ID ${sessionId} not found. Creating a new session.`,
        );
        await createNewSession();
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
  const createNewSession =
    useCallback(async (): Promise<ChatSession | null> => {
      setInfo((prev) => ({ ...prev, isProcessing: true }));
      try {
        const [status, response] = await createNewChatSessionApi({});
        if (status && response?.data) {
          if (response.data._id) {
            setSessionToken(response.data._id);
          }
          setSession(response.data);
          return response.data;
        }
        return null;
      } catch (error) {
        console.error("Failed to create new chat session:", error);
        return null;
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
    async (content: string) => {
      const trimmedQuestion = content.trim();
      if (!trimmedQuestion || info.isProcessing) return;

      let activeSessionId = session?._id || getSessionToken();
      if (!activeSessionId) {
        const createdSession = await createNewSession();
        activeSessionId = createdSession?._id || null;
      }

      if (!activeSessionId) return;

      const now = new Date();
      const tempHumanMsgId = `temp_human_${Date.now()}`;
      const tempAiMsgId = `temp_ai_${Date.now() + 1}`;

      const existingMessages = session?.messages ?? [];
      const currentMaxOrder = existingMessages.reduce(
        (max, m) => Math.max(max, m.order ?? 0),
        0,
      );

      const optimisticHumanMessage: Message = {
        _id: tempHumanMsgId,
        content: trimmedQuestion,
        role: "human",
        timestamp: now.toISOString(),
        status: "completed",
        order: currentMaxOrder + 1,
      };

      const optimisticAiMessage: Message = {
        _id: tempAiMsgId,
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
            _id: activeSessionId!,
            date: now,
            deviceType: detectDeviceType(),
            title: "Aethel Flow AI Support",
            messages: [optimisticHumanMessage, optimisticAiMessage],
            createdAt: now,
            updatedAt: now,
          };
        }
        return {
          ...prev,
          updatedAt: now,
          messages: [
            ...prev.messages,
            optimisticHumanMessage,
            optimisticAiMessage,
          ],
        };
      });

      try {
        const [status, response] = await sendMessageApi(activeSessionId, {
          inputQuestion: trimmedQuestion,
        });

        if (status && Array.isArray(response?.data)) {
          const [humanMsgData, aiMsgData] = response.data;
          const returnedMessages = [humanMsgData, aiMsgData].filter(
            Boolean,
          ) as Message[];

          setSession((prev) => {
            if (!prev) return null;
            const filteredMessages = prev.messages.filter(
              (m) => m._id !== tempHumanMsgId && m._id !== tempAiMsgId,
            );
            return {
              ...prev,
              updatedAt: new Date(),
              messages: [...filteredMessages, ...returnedMessages],
            };
          });
        } else {
          setSession((prev) => {
            if (!prev) return null;
            return {
              ...prev,
              messages: prev.messages.map((m) =>
                m._id === tempAiMsgId
                  ? {
                      ...m,
                      status: "failed",
                      error:
                        response?.message ||
                        "Failed to get a response from AI.",
                    }
                  : m,
              ),
            };
          });
        }
      } catch (error) {
        console.error("Failed to send message:", error);
        setSession((prev) => {
          if (!prev) return null;
          return {
            ...prev,
            messages: prev.messages.map((m) =>
              m._id === tempAiMsgId
                ? {
                    ...m,
                    status: "failed",
                    error: "Something went wrong. Please try again.",
                  }
                : m,
            ),
          };
        });
      } finally {
        setInfo((prev) => ({
          ...prev,
          isProcessing: false,
        }));
      }
    },
    [info.isProcessing, session, createNewSession],
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
