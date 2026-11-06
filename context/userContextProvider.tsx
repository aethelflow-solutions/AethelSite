"use client";

import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { UserProfile } from "@/types/user.type";
import { userProfileApi } from "@/_api/admin-user.api";
import {
  getAccessToken,
  clearAll as clearAllLocalStorage,
} from "@/helpers/localStorage.helper";
import { clearAll as clearAllSessionStorage } from "@/helpers/sessionStorage.helper";

export interface UserContextType {
  userProfile: UserProfile | null;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile | null>>;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined,
);

interface UserContextProviderProps {
  children: ReactNode;
}

export function UserContextProvider({ children }: UserContextProviderProps) {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const router = useRouter();

  const handleInvalidSession = useCallback(() => {
    clearAllLocalStorage();
    clearAllSessionStorage();
    setUserProfile(null);
    router.replace("/admin/login");
  }, [router]);

  useEffect(() => {
    const token = getAccessToken();
    if (!token) return;

    const fetchProfile = async () => {
      try {
        const [status, response] = await userProfileApi();
        if (status && response?.success && response?.data) {
          setUserProfile(response.data);
        } else {
          handleInvalidSession();
        }
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
        handleInvalidSession();
      }
    };

    fetchProfile();
  }, []);

  return (
    <UserContext.Provider value={{ userProfile, setUserProfile }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
