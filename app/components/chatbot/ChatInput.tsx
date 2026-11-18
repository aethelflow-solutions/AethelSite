"use client";

import React, { useState, useRef, useEffect } from "react";
import { SendHorizontal, Mic, MicOff } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (content: string) => void;
  disabled?: boolean;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognitionResult {
  readonly isFinal: boolean;
  readonly length: number;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionResultList {
  readonly length: number;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionEvent extends Event {
  readonly resultIndex: number;
  readonly results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent extends Event {
  readonly error: string;
  readonly message?: string;
}

interface SpeechRecognitionInstance extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
  abort: () => void;
}

type SpeechRecognitionConstructor = new () => SpeechRecognitionInstance;

export default function ChatInput({
  onSendMessage,
  disabled = false,
}: ChatInputProps) {
  const [inputValue, setInputValue] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isSpeechSupported, setIsSpeechSupported] = useState(false);
  const [speechError, setSpeechError] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);
  const baseTextRef = useRef<string>("");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const SpeechRecognitionAPI =
      (
        window as unknown as {
          SpeechRecognition?: SpeechRecognitionConstructor;
          webkitSpeechRecognition?: SpeechRecognitionConstructor;
        }
      ).SpeechRecognition ||
      (
        window as unknown as {
          webkitSpeechRecognition?: SpeechRecognitionConstructor;
        }
      ).webkitSpeechRecognition;

    if (!SpeechRecognitionAPI) {
      setIsSpeechSupported(false);
      return;
    }

    setIsSpeechSupported(true);

    const recognition = new SpeechRecognitionAPI();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = navigator.language || "en-US";

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let finalTranscript = "";
      let interimTranscript = "";

      for (let i = 0; i < event.results.length; i++) {
        const result = event.results[i];
        const transcript = result[0]?.transcript || "";
        if (result.isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }

      const spokenText = (finalTranscript + interimTranscript).trim();
      const prefix = baseTextRef.current;
      const combined = prefix
        ? `${prefix}${spokenText ? ` ${spokenText}` : ""}`
        : spokenText;

      setInputValue(combined);
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      setIsListening(false);
      if (event.error === "not-allowed") {
        setSpeechError("Microphone access denied.");
      } else if (event.error !== "aborted" && event.error !== "no-speech") {
        setSpeechError("Voice input error. Please try again.");
      }
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.abort();
    };
  }, []);

  useEffect(() => {
    if (disabled && isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    }
  }, [disabled, isListening]);

  const handleToggleSpeech = () => {
    if (!recognitionRef.current || disabled) return;
    setSpeechError(null);

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
      inputRef.current?.focus();
    } else {
      try {
        baseTextRef.current = inputValue.trim();
        recognitionRef.current.start();
        setIsListening(true);
      } catch {
        setIsListening(false);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    }
    const trimmed = inputValue.trim();
    if (!trimmed || disabled) return;
    onSendMessage(trimmed);
    setInputValue("");
    baseTextRef.current = "";
    inputRef.current?.focus();
  };

  return (
    <div className="p-3.5 bg-white border-t border-gray-200/80 shrink-0">
      <form
        onSubmit={handleSubmit}
        className={`flex items-center gap-2 bg-gray-50 border rounded-2xl px-3.5 py-2 transition-all ${
          isListening
            ? "border-[#28a2fe] ring-2 ring-[#28a2fe]/15 bg-sky-50/30"
            : "border-gray-200"
        }`}
      >
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            if (!isListening) {
              baseTextRef.current = e.target.value;
            }
          }}
          disabled={disabled}
          placeholder={
            disabled
              ? "Waiting for AI response..."
              : isListening
                ? "Listening... Speak now"
                : "Type your message..."
          }
          style={{ outline: "none", boxShadow: "none" }}
          className="flex-1 bg-transparent text-sm text-gray-800 placeholder-gray-400 border-none outline-none focus:outline-none focus-visible:!outline-none focus:ring-0 disabled:opacity-60"
        />

        {isSpeechSupported && (
          <button
            type="button"
            onClick={handleToggleSpeech}
            disabled={disabled}
            title={isListening ? "Stop voice input" : "Start voice input"}
            aria-label={isListening ? "Stop voice input" : "Start voice input"}
            className={`relative flex items-center justify-center w-9 h-9 rounded-xl transition-all cursor-pointer shrink-0 disabled:opacity-35 disabled:pointer-events-none ${
              isListening
                ? "bg-red-500 hover:bg-red-600 text-white shadow-xs"
                : "bg-gray-200/70 hover:bg-gray-200 text-gray-700"
            }`}
          >
            {isListening && (
              <span className="absolute inset-0 rounded-xl bg-red-500 animate-ping opacity-30 pointer-events-none" />
            )}
            {isListening ? (
              <MicOff className="w-4 h-4 relative z-10" />
            ) : (
              <Mic className="w-4 h-4 relative z-10" />
            )}
          </button>
        )}

        <button
          type="submit"
          disabled={!inputValue.trim() || disabled}
          aria-label="Send message"
          className="flex items-center justify-center w-9 h-9 rounded-xl bg-[#1B1A1A] hover:bg-black text-white shadow-xs disabled:opacity-35 disabled:pointer-events-none transition-all cursor-pointer shrink-0"
        >
          <SendHorizontal className="w-4 h-4" />
        </button>
      </form>

      {speechError && (
        <p className="mt-1.5 text-center text-[11px] text-red-500">
          {speechError}
        </p>
      )}

      <div className="mt-2 flex items-center justify-center text-[10.5px] text-gray-400">
        <span>Powered by</span>
        <span className="font-semibold text-gray-700 ml-1">
          Aethel Flow AI
        </span>
      </div>
    </div>
  );
}
