import { getAccessToken } from "@/helpers/localStorage.helper";
import Service from "@/service";
import { UserPrfoileApiResponse } from "@/types/user.type";

export const userProfileApi = async () => {
  const token = getAccessToken();
  const response = await Service.fetchGet<UserPrfoileApiResponse>(
    "/admin/user/profile",
    token,
  );
  return response;
};
