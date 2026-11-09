import {
  AiMessageResponse,
  ChatBotSettingsResponse,
  ChatSessionResponse,
  NewSessionChatPayload,
  sendMessagePayload,
} from "@/types/chat.type";
import service from "../service";

/**
 * Create a new chat session for a chatbot
 */
export const createNewChatSessionApi = async (
  newSessionData: NewSessionChatPayload = {},
) => {
  const response = await service.fetchPost<ChatSessionResponse>(
    `/chat/new-chat`,
    newSessionData,
  );
  return response;
};

export const getChatSessionApi = async (sessionId: string) => {
  const response = await service.fetchGet<ChatSessionResponse>(
    `/chat/${sessionId}`,
  );
  return response;
};

export const sendMessageApi = async (
  sessionId: string,
  payload: sendMessagePayload,
) => {
  const response = await service.fetchPost<AiMessageResponse>(
    `/chat/${sessionId}`,
    payload,
  );
  return response;
};

export const getChatBotSettingsApi = async () => {
  const response = await service.fetchGet<ChatBotSettingsResponse>(`/settings`);
  return response;
};
