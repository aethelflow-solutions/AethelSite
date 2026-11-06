export type UserRole = "admin" | "user";

export interface UserProfile {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  isEmailVerified: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: 0;
  lastLoginAt: string;
}
