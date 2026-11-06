import { getAccessToken } from "@/helpers/localStorage.helper";
import Service from "@/service";
import { AdminChatSessionsResponse } from "@/types/admin-chat.type";

export const fetchChatSessionsListApi = async (
  payload: {
    page: number;
    limit: number;
  } = { page: 1, limit: 10 },
) => {
  const searchParams = new URLSearchParams({
    page: payload.page.toString(),
    limit: payload.limit.toString(),
  });
  const token = getAccessToken();
  const response = await Service.fetchGet<AdminChatSessionsResponse>(
    `/admin/chat/session-list?${searchParams.toString()}`,
    token,
  );
  return response;
};
