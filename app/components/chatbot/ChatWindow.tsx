"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { ChatSession, Message } from "@/types/chat.type";
import {
  getBestEnglishVoice,
  stripMarkdownForSpeech,
} from "@/helpers/speech.helper";
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
  const [autoSpeak, setAutoSpeak] = useState(false);
  const [isSpeechSupported, setIsSpeechSupported] = useState(false);
  const [speakingMessageId, setSpeakingMessageId] = useState<string | null>(
    null,
  );

  const lastSpokenMessageIdRef = useRef<string | null>(null);
  const hasSeededHistoryRef = useRef(false);
  const preferredVoiceRef = useRef<SpeechSynthesisVoice | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

    setIsSpeechSupported(true);

    const loadPreferredVoice = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      if (availableVoices.length > 0) {
        preferredVoiceRef.current = getBestEnglishVoice(availableVoices);
      }
    };

    loadPreferredVoice();
    window.speechSynthesis.addEventListener(
      "voiceschanged",
      loadPreferredVoice,
    );

    return () => {
      window.speechSynthesis.removeEventListener(
        "voiceschanged",
        loadPreferredVoice,
      );
      window.speechSynthesis.cancel();
    };
  }, []);

  const stopSpeaking = useCallback(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setSpeakingMessageId(null);
  }, []);

  const speakMessage = useCallback(
    (message: Message) => {
      if (
        typeof window === "undefined" ||
        !("speechSynthesis" in window) ||
        !message.content
      ) {
        return;
      }

      const plainText = stripMarkdownForSpeech(message.content);
      if (!plainText) return;

      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(plainText);
      const selectedVoice =
        preferredVoiceRef.current ||
        getBestEnglishVoice(window.speechSynthesis.getVoices());

      if (selectedVoice) {
        preferredVoiceRef.current = selectedVoice;
        utterance.voice = selectedVoice;
        utterance.lang = selectedVoice.lang;
      } else {
        utterance.lang = "en-US";
      }

      utterance.rate = 0.98;
      utterance.pitch = 1.0;

      utterance.onstart = () => {
        setSpeakingMessageId(message._id);
      };
      utterance.onend = () => {
        setSpeakingMessageId((current) =>
          current === message._id ? null : current,
        );
      };
      utterance.onerror = () => {
        setSpeakingMessageId((current) =>
          current === message._id ? null : current,
        );
      };

      setSpeakingMessageId(message._id);
      window.speechSynthesis.speak(utterance);
    },
    [],
  );

  const handleToggleSpeakMessage = useCallback(
    (message: Message) => {
      if (speakingMessageId === message._id) {
        stopSpeaking();
      } else {
        speakMessage(message);
      }
    },
    [speakingMessageId, stopSpeaking, speakMessage],
  );

  const handleToggleAutoSpeak = useCallback(() => {
    setAutoSpeak((prev) => {
      const next = !prev;
      if (!next) {
        stopSpeaking();
      }
      return next;
    });
  }, [stopSpeaking]);

  // Stop speech when chat closes
  useEffect(() => {
    if (!isOpen) {
      stopSpeaking();
    }
  }, [isOpen, stopSpeaking]);

  // Track latest completed AI message and auto-read new responses when autoSpeak is enabled
  useEffect(() => {
    const msgs = session?.messages ?? [];
    const completedAiMessages = msgs.filter(
      (m) =>
        m.role === "ai" &&
        m.status === "completed" &&
        !m._id.startsWith("temp_") &&
        Boolean(m.content?.trim()),
    );
    const latestAiMsg =
      completedAiMessages[completedAiMessages.length - 1] ?? null;

    if (!hasSeededHistoryRef.current) {
      hasSeededHistoryRef.current = true;
      lastSpokenMessageIdRef.current = latestAiMsg?._id ?? null;
      return;
    }

    if (
      latestAiMsg &&
      latestAiMsg._id !== lastSpokenMessageIdRef.current
    ) {
      lastSpokenMessageIdRef.current = latestAiMsg._id;
      if (autoSpeak && isOpen) {
        speakMessage(latestAiMsg);
      }
    }
  }, [session?.messages, autoSpeak, isOpen, speakMessage]);

  const handleReset = useCallback(() => {
    stopSpeaking();
    lastSpokenMessageIdRef.current = null;
    onResetChat();
  }, [stopSpeaking, onResetChat]);

  const handleSend = useCallback(
    (content: string) => {
      stopSpeaking();
      onSendMessage(content);
    },
    [stopSpeaking, onSendMessage],
  );

  if (!isOpen) return null;

  const messages = session?.messages ?? [];
  const showInitialQuestions =
    messages.length === 0 || !messages.some((m) => m.role === "human");

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
          isProcessing={isProcessing}
          isExpanded={isExpanded}
          autoSpeak={autoSpeak}
          isSpeechSupported={isSpeechSupported}
          onToggleAutoSpeak={handleToggleAutoSpeak}
          onToggleExpand={() => setIsExpanded((prev) => !prev)}
          onResetChat={handleReset}
          onClose={onClose}
        />

        <ChatMessageList
          messages={messages}
          sessionDate={session?.date}
          onRetry={onRetryMessage}
          speakingMessageId={speakingMessageId}
          isSpeechSupported={isSpeechSupported}
          onToggleSpeak={handleToggleSpeakMessage}
        />

        {showInitialQuestions && (
          <ChatSuggestions
            suggestions={suggestions}
            onSelect={handleSend}
            disabled={isProcessing}
          />
        )}

        <ChatInput onSendMessage={handleSend} disabled={isProcessing} />
      </aside>
    </>
  );
}
