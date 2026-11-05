const SESSION_TOKEN_KEY = "embedbot_login_token" as const;

// Session Token Management
export const getSessionToken = (): string | null => {
  return sessionStorage.getItem(SESSION_TOKEN_KEY);
};

export const setSessionToken = (token: string): boolean => {
  sessionStorage.setItem(SESSION_TOKEN_KEY, token);
  return true;
};

export const removeSessionToken = (): boolean => {
  sessionStorage.removeItem(SESSION_TOKEN_KEY);
  return true;
};

// Clear All Session Storage
export const clearAll = (): boolean => {
  sessionStorage.clear();
  return true;
};
