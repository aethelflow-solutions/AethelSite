export interface AdminSettings {
  _id: string;
  isBotActive: boolean;
  max_token_usage: number;
  initialQuestions: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface UpdateAdminSettingsPayload {
  isBotActive: boolean;
  max_token_usage: number;
  initialQuestions: string[];
}

export interface AdminSettingsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: AdminSettings;
}
