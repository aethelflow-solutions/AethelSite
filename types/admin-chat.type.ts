import { DeviceType } from "./chat.type";
import { Pagination } from "./index.type";

export interface AdminChatSessionItem {
  _id: string;
  title: string;
  deviceType: DeviceType;
  date: string;
  createdAt: string;
}

export interface AdminChatSessionsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    sessionsList: AdminChatSessionItem[];
    pagination: Pagination;
  };
}
