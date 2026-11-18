import { DeviceType } from "@/types/chat.type";

// Speech Recognition Type Definitions
export interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

export interface SpeechRecognitionResult {
  readonly isFinal: boolean;
  readonly length: number;
  [index: number]: SpeechRecognitionAlternative;
}

export interface SpeechRecognitionResultList {
  readonly length: number;
  [index: number]: SpeechRecognitionResult;
}

export interface SpeechRecognitionEvent extends Event {
  readonly resultIndex: number;
  readonly results: SpeechRecognitionResultList;
}

export interface SpeechRecognitionErrorEvent extends Event {
  readonly error: string;
  readonly message?: string;
}

export interface SpeechRecognitionInstance extends EventTarget {
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

export type SpeechRecognitionConstructor = new () => SpeechRecognitionInstance;

/**
 * Retrieve browser's SpeechRecognition constructor if supported
 */
export const getSpeechRecognitionAPI =
  (): SpeechRecognitionConstructor | null => {
    if (typeof window === "undefined") return null;

    const win = window as unknown as {
      SpeechRecognition?: SpeechRecognitionConstructor;
      webkitSpeechRecognition?: SpeechRecognitionConstructor;
    };

    return win.SpeechRecognition || win.webkitSpeechRecognition || null;
  };

/**
 * Strip markdown syntax so SpeechSynthesis reads clean natural text
 */
export const stripMarkdownForSpeech = (markdown: string): string => {
  return markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/(\*\*|__)(.*?)\1/g, "$2")
    .replace(/(\*|_)(.*?)\1/g, "$2")
    .replace(/~~(.*?)~~/g, "$1")
    .replace(/^\s*[-*+]\s+/gm, ". ")
    .replace(/^\s*\d+\.\s+/gm, ". ")
    .replace(/^\s*>\s+/gm, "")
    .replace(/\|/g, " ")
    .replace(/\n+/g, ". ")
    .replace(/\.\s*\./g, ".")
    .replace(/\s+/g, " ")
    .trim();
};

/**
 * Pick the most natural-sounding English voice available on the browser/OS
 */
export const getBestEnglishVoice = (
  voices: SpeechSynthesisVoice[],
): SpeechSynthesisVoice | null => {
  if (!voices.length) return null;

  const enVoices = voices.filter((v) =>
    v.lang.toLowerCase().startsWith("en"),
  );
  const pool = enVoices.length > 0 ? enVoices : voices;

  // Exclude novelty / robotic macOS voices
  const badVoiceKeywords = [
    "albert",
    "bad news",
    "bahh",
    "bells",
    "boing",
    "bubbles",
    "cellos",
    "deranged",
    "good news",
    "hysterical",
    "junior",
    "kathy",
    "organ",
    "princess",
    "ralph",
    "trinoids",
    "whisper",
    "zarvox",
    "fred",
    "espeak",
  ];

  const cleanPool = pool.filter(
    (v) =>
      !badVoiceKeywords.some((kw) => v.name.toLowerCase().includes(kw)),
  );
  const candidates = cleanPool.length > 0 ? cleanPool : pool;

  // Priority order of natural-sounding neural / premium voices across Chrome, Edge, Safari, macOS, Windows
  const preferredMatchers: ((v: SpeechSynthesisVoice) => boolean)[] = [
    (v) =>
      v.name.includes("Natural") &&
      (v.name.includes("Aria") ||
        v.name.includes("Jenny") ||
        v.name.includes("Ava") ||
        v.name.includes("Sonia") ||
        v.name.includes("Guy")),
    (v) => v.name.includes("Natural") || v.name.includes("Neural"),
    (v) => v.name === "Google UK English Female",
    (v) => v.name === "Google US English",
    (v) => v.name === "Google UK English Male",
    (v) => v.name.includes("Google") && v.lang.toLowerCase().startsWith("en"),
    (v) =>
      (v.name.includes("Premium") || v.name.includes("Enhanced")) &&
      (v.name.includes("Samantha") ||
        v.name.includes("Ava") ||
        v.name.includes("Zoe") ||
        v.name.includes("Allison") ||
        v.name.includes("Serena") ||
        v.name.includes("Daniel")),
    (v) => v.name.includes("Premium") || v.name.includes("Enhanced"),
    (v) => v.name.includes("Siri"),
    (v) =>
      v.name.includes("Samantha") ||
      v.name.includes("Ava") ||
      v.name.includes("Serena") ||
      v.name.includes("Karen") ||
      v.name.includes("Moira") ||
      v.name.includes("Tessa") ||
      v.name.includes("Daniel"),
    (v) =>
      v.name.includes("Microsoft") &&
      (v.name.includes("Aria") ||
        v.name.includes("Jenny") ||
        v.name.includes("Zira") ||
        v.name.includes("Hazel")),
  ];

  for (const matcher of preferredMatchers) {
    const found = candidates.find(matcher);
    if (found) return found;
  }

  return (
    candidates.find((v) => v.lang === "en-US" || v.lang === "en-GB") ||
    candidates[0]
  );
};

/**
 * Format message ISO timestamp into readable 12-hour time
 */
export const formatMessageTime = (timestamp?: string): string => {
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
};

/**
 * Detect device category from window viewport width
 */
export const detectDeviceType = (): DeviceType => {
  if (typeof window === "undefined") return "unknown";
  const width = window.innerWidth;
  if (width < 640) return "mobile";
  if (width < 1024) return "tablet";
  return "desktop";
};
