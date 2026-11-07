import Service from "@/service";

export interface FormDetailsPayload {
  name: string;
  email: string;
  companyName?: string;
  phoneNumber: string;
  category: string;
  message?: string;
}
export const sendFormDetailsApi = async (payload: FormDetailsPayload) => {
  const response = await Service.fetchPost(`/form/new-submission`, payload);
  return response;
};
