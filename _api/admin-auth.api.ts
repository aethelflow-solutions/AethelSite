import Service from "@/service";
import { AuthLoginPayload, AuthLoginResponse } from "@/types/admin-auth.type";

export const loginApi = async (payload: AuthLoginPayload) => {
  const response = await Service.fetchPost<AuthLoginResponse>(
    "/admin/auth/login",
    payload,
  );
  return response;
};
