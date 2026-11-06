export type DeviceType = "mobile" | "tablet" | "desktop" | "unknown";

export interface Message {
  _id: string;
  content?: string;
  role?: "human" | "ai";
  timestamp?: string;
  metadata?: Record<string, any>;
  tokenUsage?: {
    input_tokens: number;
    output_tokens: number;
    total_tokens: number;
  };
  status?: "processing" | "completed" | "failed";
  order?: number;
  error?: string;
}

export interface ChatSession {
  _id: string;
  date: Date;
  deviceType?: DeviceType;
  title?: String;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

export interface NewSessionChatPayload {
  title?: string;
}

export interface sendMessagePayload {
  inputQuestion: string;
}

export interface ChatSessionResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: ChatSession;
}

export interface AiMessageResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: Message[];
  aiMessageId: string;
  promp: string;
  aiMessageAnswer: string;
}
