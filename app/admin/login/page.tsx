"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";
import { loginApi } from "@/_api/admin-auth.api";
import { setAccessToken } from "@/helpers/localStorage.helper";
import { useProfileHook } from "@/hooks/useProfileHook";

interface LoginFormState {
  email: string;
  password: string;
}

interface LoginFormErrors {
  email?: string;
  password?: string;
  general?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function AdminLoginPage() {
  const router = useRouter();
  const { setUserProfile } = useProfileHook();

  const [form, setForm] = useState<LoginFormState>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<LoginFormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validate = (): boolean => {
    const nextErrors: LoginFormErrors = {};

    if (!form.email.trim()) {
      nextErrors.email = "Email address is required";
    } else if (!EMAIL_REGEX.test(form.email.trim())) {
      nextErrors.email = "Please enter a valid email address";
    }

    if (!form.password) {
      nextErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      nextErrors.password = "Password must be at least 6 characters";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof LoginFormErrors] || errors.general) {
      setErrors((prev) => ({ ...prev, [name]: undefined, general: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    try {
      const [status, response] = await loginApi({
        email: form.email.trim(),
        password: form.password,
      });

      if (status && response) {
        console.log("Login API Response:", response);
        if (response.data?.accessToken) {
          setAccessToken(response.data.accessToken);
        }
        if (response.data?.userDetails) {
          setUserProfile(response.data.userDetails);
        }
        toast.success(response.message || "Logged in successfully");
        router.push("/admin/dashboard");
      } else {
        const errorMessage =
          response?.message || "Invalid email or password. Please try again.";
        setErrors({ general: errorMessage });
        toast.error(errorMessage);
      }
    } catch {
      const errorMessage = "Something went wrong. Please try again.";
      setErrors({ general: errorMessage });
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen w-full flex items-center justify-center px-4 py-12 overflow-hidden bg-[#05060a]">
      {/* Subtle ambient sky-blue glow matching website theme */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#28a2fe]/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-[#28a2fe]/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-md">
        {/* Top Brand Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-3 mb-5 group focus:outline-none"
          >
            <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/15 p-0.5 shadow-lg overflow-hidden group-hover:scale-105 transition-transform">
              <div className="w-full h-full rounded-[14px] bg-black flex items-center justify-center overflow-hidden">
                <img
                  src="/logo.png"
                  alt="Aethel Flow Logo"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <span className="text-white font-semibold text-xl tracking-wide">
              AETHEL <span className="italic text-[#7dd3fc]">FLOW</span>
            </span>
          </Link>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#7dd3fc] text-xs font-medium mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-[#28a2fe]" />
            <span>Admin Portal</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-semibold text-white">
            Welcome back
          </h1>
          <span className="text-sm text-gray-400 mt-1">
            Sign in to manage Aethel Flow conversations &amp; settings
          </span>
        </div>

        {/* Login Card */}
        <div className="rounded-3xl bg-white p-6 sm:p-8 shadow-[0_25px_70px_rgba(0,0,0,0.55)] border border-gray-100">
          {errors.general && (
            <div className="mb-5 flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{errors.general}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2"
              >
                Email Address
              </label>
              <div
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl bg-gray-50 border transition-colors ${
                  errors.email
                    ? "border-red-400 bg-red-50/30"
                    : "border-gray-200 focus-within:border-[#1B1A1A] focus-within:bg-white"
                }`}
              >
                <Mail className="w-4 h-4 text-gray-400 shrink-0" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="admin@aethelflow.com"
                  style={{ outline: "none", boxShadow: "none" }}
                  className="w-full bg-transparent text-sm text-gray-900 placeholder-gray-400 border-none focus:outline-none"
                />
              </div>
              {errors.email && (
                <span className="block text-xs text-red-600 mt-1.5 pl-1">
                  {errors.email}
                </span>
              )}
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="password"
                  className="block text-xs font-semibold text-gray-700 uppercase tracking-wider"
                >
                  Password
                </label>
              </div>

              <div
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl bg-gray-50 border transition-colors ${
                  errors.password
                    ? "border-red-400 bg-red-50/30"
                    : "border-gray-200 focus-within:border-[#1B1A1A] focus-within:bg-white"
                }`}
              >
                <Lock className="w-4 h-4 text-gray-400 shrink-0" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  style={{ outline: "none", boxShadow: "none" }}
                  className="w-full bg-transparent text-sm text-gray-900 placeholder-gray-400 border-none focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="text-gray-400 hover:text-gray-700 transition-colors cursor-pointer shrink-0"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <span className="block text-xs text-red-600 mt-1.5 pl-1">
                  {errors.password}
                </span>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-[#1B1A1A] hover:bg-black text-white text-sm font-semibold shadow-md transition-all disabled:opacity-60 disabled:pointer-events-none cursor-pointer"
            >
              <span>{isLoading ? "Signing in..." : "Sign In"}</span>
              {!isLoading && <ArrowRight className="w-4 h-4" />}
            </button>
          </form>
        </div>

        {/* Bottom Back Link */}
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-xs text-gray-400 hover:text-white transition-colors"
          >
            ← Back to Aethel Flow website
          </Link>
        </div>
      </div>
    </main>
  );
}
