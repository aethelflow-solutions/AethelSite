import { getAccessToken } from "@/helpers/localStorage.helper";
import Service from "@/service";
import { FormResponse } from "@/types/admin-form.type";

export const fetchFormsListApi = async (
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
  const response = await Service.fetchGet<FormResponse>(
    `/admin/forms/list?${searchParams.toString()}`,
    token,
  );
  return response;
};
