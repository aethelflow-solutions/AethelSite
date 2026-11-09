import { getAccessToken } from "@/helpers/localStorage.helper";
import Service from "@/service";
import {
  AdminSettingsResponse,
  UpdateAdminSettingsPayload,
} from "@/types/admin-settings.type";

export const fetchAdminSettingsApi = async () => {
  const token = getAccessToken();
  const response = await Service.fetchGet<AdminSettingsResponse>(
    "/admin/settings",
    token,
  );
  return response;
};

export const updateAdminSettingsApi = async (
  payload: UpdateAdminSettingsPayload,
) => {
  const token = getAccessToken();
  const response = await Service.fetchPut<
    AdminSettingsResponse,
    UpdateAdminSettingsPayload
  >("/admin/settings", payload, token);
  return response;
};
