import type { AxiosRequestConfig, AxiosResponse } from "axios";
import axios from "axios";
import router from "next/router";
import { AxiosConfig, RequestMethodInstance } from "./axiosInstance";
import API_URLS from "./config";
import { clearAll } from "@/helpers/sessionStorage.helper";

// Define access point keys based on API_URLS
type AccessPoint = "server";

// Content type options
type ContentType = "json" | "formData" | null;

// Define the unified API response tuple
type ServiceResponse<T = any> = [boolean, T, number?, AxiosResponse?];

// Map base API URLs
const ApiUrlMapper: Record<AccessPoint, string> = {
  server: API_URLS.API_SERVER,
};

/**
 * Builds headers dynamically based on token and content type.
 */
const handleHeaders = (
  token?: string | null,
  contentType?: ContentType,
): AxiosRequestConfig => {
  const axiosConfig = new AxiosConfig();

  if (!contentType) {
    axiosConfig.removeContentType();
  } else if (contentType === "formData") {
    axiosConfig.addFormHeaderContentType();
  }

  if (token) {
    axiosConfig.addAuthorization(token);
  }

  return axiosConfig.getConfig();
};

/**
 * Handles Axios responses and normalizes the result.
 */
const processResponse = async <T = any>(
  response: AxiosResponse<T> | any,
): Promise<ServiceResponse<T>> => {
  if (response?.message === "Network Error") {
    return [false, { message: response.message } as T, 500];
  }

  if (response.status === 200 || response.status === 201) {
    return [true, response.data, response.status, response];
  } else if (response.status === 401) {
    if (response?.data?.message === "Invalid email or password") {
      return [false, response.data, response.status, response];
    }
    console.log(response.status, response.data);
    await onUserKickedOut();
    return [false, response.data, response.status, response];
  } else {
    return [false, response.data, response.status, response];
  }
};

// Create API request handler
const apiFetch = new RequestMethodInstance();

/**
 * Unified API service with typed endpoints.
 */
const Service = {
  fetchGet: async <T = any>(
    url: string,
    token: string | null = null,
    contentType: ContentType = null,
    accessPoint: AccessPoint = "server",
  ): Promise<ServiceResponse<T>> => {
    try {
      const endpoint = ApiUrlMapper[accessPoint] + url;
      const headers = handleHeaders(token, contentType);
      const response = await apiFetch.getMethod<T>(endpoint, headers);
      return processResponse(response);
    } catch (error: any) {
      if (axios.isCancel(error)) {
        console.log(`Request to ${url} was cancelled`);
        return [false, { message: "api is aborted" } as T];
      }
      onFailure("network", url);
      return processResponse(error?.response || error);
    }
  },

  fetchPost: async <T = any, B = any>(
    url: string,
    body: B,
    token?: string,
    contentType: ContentType = "json",
    accessPoint: AccessPoint = "server",
  ): Promise<ServiceResponse<T>> => {
    try {
      const endpoint = ApiUrlMapper[accessPoint] + url;
      const headers = handleHeaders(token, contentType);
      const response = await apiFetch.postMethod<T, B>(endpoint, body, headers);
      return processResponse(response);
    } catch (error: any) {
      onFailure("network", url);
      return processResponse(error?.response || error);
    }
  },

  fetchPut: async <T = any, B = any>(
    url: string,
    body: B,
    token: string | null = null,
    contentType: ContentType = "json",
    accessPoint: AccessPoint = "server",
  ): Promise<ServiceResponse<T>> => {
    try {
      const endpoint = ApiUrlMapper[accessPoint] + url;
      const headers = handleHeaders(token, contentType);
      const response = await apiFetch.putMethod<T, B>(endpoint, body, headers);
      return processResponse(response);
    } catch (error: any) {
      onFailure("network", url);
      return processResponse(error?.response || error);
    }
  },

  fetchPatch: async <T = any, B = any>(
    url: string,
    body: B,
    token: string | null = null,
    contentType: ContentType = "json",
    accessPoint: AccessPoint = "server",
  ): Promise<ServiceResponse<T>> => {
    try {
      const endpoint = ApiUrlMapper[accessPoint] + url;
      const headers = handleHeaders(token, contentType);
      const response = await apiFetch.patchMethod<T, B>(
        endpoint,
        body,
        headers,
      );
      return processResponse(response);
    } catch (error: any) {
      onFailure("network", url);
      return processResponse(error?.response || error);
    }
  },

  fetchDelete: async <T = any>(
    url: string,
    token: string | null = null,
    contentType: ContentType = "json",
    accessPoint: AccessPoint = "server",
  ): Promise<ServiceResponse<T>> => {
    try {
      const endpoint = ApiUrlMapper[accessPoint] + url;
      const headers = handleHeaders(token, contentType);
      const response = await apiFetch.deleteMethod<T>(endpoint, headers);
      return processResponse(response);
    } catch (error: any) {
      onFailure("network", url);
      return processResponse(error?.response || error);
    }
  },

  cancelAllRequests: (): void => {
    apiFetch.cancelAllRequests();
  },

  cancelRequest: (
    url: string,
    method: string,
    accessPoint: AccessPoint = "server",
  ): void => {
    const endpoint = ApiUrlMapper[accessPoint] + url;
    apiFetch.cancelRequest(endpoint, method);
  },
};

/**
 * Handles generic API failures.
 */
const onFailure = async (res: string, url: string): Promise<void> => {
  console.log(`API FAILED: ${url} (${res})`);
};

let onKickoutListener: (() => void) | null = null;

export const setOnKickoutListener = (listener: () => void | null) => {
  onKickoutListener = listener;
};

/**
 * Handles forced user logout (401 responses).
 */
const onUserKickedOut = async (): Promise<void> => {
  console.log("User kicked out");
  clearAll();
  if (onKickoutListener) {
    try {
      onKickoutListener();
    } catch (e) {
      console.warn("Error running kickout listener", e);
    }
  }
  try {
    router.replace("/login");
  } catch (e) {
    console.warn("Error navigating to /login on kickout", e);
  }
};

export default Service;
