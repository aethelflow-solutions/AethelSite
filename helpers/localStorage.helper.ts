const ACCESS_TOKEN_KEY = "aethel_admin_access_token" as const;

// Access Token Management
export const getAccessToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(ACCESS_TOKEN_KEY);
};

export const setAccessToken = (token: string): boolean => {
  if (typeof window === "undefined") return false;
  localStorage.setItem(ACCESS_TOKEN_KEY, token);
  return true;
};

export const removeAccessToken = (): boolean => {
  if (typeof window === "undefined") return false;
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  return true;
};

// Clear All Local Storage
export const clearAll = (): boolean => {
  if (typeof window === "undefined") return false;
  localStorage.clear();
  return true;
};
