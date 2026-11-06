"use client";

import { useContext } from "react";
import { UserContext, type UserContextType } from "@/context/userContextProvider";

export function useProfileHook(): UserContextType {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useProfileHook must be used within a UserContextProvider");
  }
  return context;
}

export default useProfileHook;
