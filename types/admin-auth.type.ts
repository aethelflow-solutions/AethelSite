import { UserProfile } from "./user.type";

export interface AuthLoginPayload {
  email: string;
  password: string;
}

export interface AuthLoginResponse {
  success: boolean;
  status: number;
  message: string;
  data: {
    userDetails: UserProfile;
    accessToken: string;
  };
}
