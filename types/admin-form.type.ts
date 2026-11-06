import { Pagination } from "./index.type";

export interface Form {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
  companyName: string;
  category: string;
  message: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface FormResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    forms: Form[];
    pagination: Pagination;
  };
}
