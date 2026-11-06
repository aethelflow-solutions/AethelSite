"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  MessageSquare,
  LogOut,
  X,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";
import { useProfileHook } from "@/hooks/useProfileHook";
import { clearAll as clearAllLocalStorage } from "@/helpers/localStorage.helper";
import { clearAll as clearAllSessionStorage } from "@/helpers/sessionStorage.helper";
import toast from "react-hot-toast";

export interface AdminNavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const ADMIN_NAV_ITEMS: AdminNavItem[] = [
  {
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Forms",
    href: "/admin/forms",
    icon: FileText,
  },
  {
    label: "Chats",
    href: "/admin/chats",
    icon: MessageSquare,
  },
];

interface AdminSidebarProps {
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

export default function AdminSidebar({
  mobileOpen,
  onCloseMobile,
}: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { userProfile, setUserProfile } = useProfileHook();

  const handleLogout = () => {
    clearAllLocalStorage();
    clearAllSessionStorage();
    setUserProfile(null);
    toast.success("Logged out successfully");
    router.replace("/admin/login");
  };

  const initials = userProfile?.name
    ? userProfile.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "AD";

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-black/50 backdrop-blur-xs z-40 lg:hidden"
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-50 w-72 bg-[#0d0d11] text-white border-r border-white/10 flex flex-col justify-between transition-transform duration-300 ease-out lg:static lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Top Brand & Navigation */}
        <div>
          {/* Brand Header */}
          <div className="flex items-center justify-between px-6 py-6 border-b border-white/10">
            <Link
              href="/admin/dashboard"
              onClick={onCloseMobile}
              className="flex items-center gap-3 group"
            >
              <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 p-0.5 shadow-md overflow-hidden">
                <div className="w-full h-full rounded-[10px] bg-black flex items-center justify-center overflow-hidden">
                  <img
                    src="/logo.png"
                    alt="Aethel Flow"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div>
                <span className="block text-white font-semibold text-base tracking-wide leading-none">
                  AETHEL <span className="italic text-[#7dd3fc]">FLOW</span>
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] text-gray-400 mt-1">
                  <ShieldCheck className="w-3 h-3 text-[#28a2fe]" />
                  Admin Workspace
                </span>
              </div>
            </Link>

            <button
              type="button"
              onClick={onCloseMobile}
              aria-label="Close sidebar"
              className="lg:hidden p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="px-4 py-6">
            <div className="px-3 mb-3 text-[11px] font-semibold uppercase tracking-wider text-gray-500">
              Navigation
            </div>

            <nav className="space-y-1.5">
              {ADMIN_NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive =
                  pathname === item.href ||
                  pathname?.startsWith(`${item.href}/`);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onCloseMobile}
                    className={`group flex items-center justify-between px-3.5 py-3 rounded-2xl text-sm font-medium transition-all ${
                      isActive
                        ? "bg-white text-[#0d0d11] shadow-md"
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon
                        className={`w-4 h-4 transition-colors ${
                          isActive
                            ? "text-[#28a2fe]"
                            : "text-gray-400 group-hover:text-white"
                        }`}
                      />
                      <span>{item.label}</span>
                    </div>

                    <ChevronRight
                      className={`w-4 h-4 transition-transform ${
                        isActive
                          ? "text-gray-900 translate-x-0.5"
                          : "opacity-0 -translate-x-1 group-hover:opacity-60 group-hover:translate-x-0"
                      }`}
                    />
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Bottom Profile & Logout */}
        <div className="p-4 border-t border-white/10 bg-[#05060a]/60">
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-2xl bg-white/5 border border-white/10 mb-3">
            <div className="w-9 h-9 rounded-xl bg-[#28a2fe]/20 border border-[#28a2fe]/30 text-[#7dd3fc] flex items-center justify-center text-xs font-semibold shrink-0">
              {initials}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xs font-semibold text-white truncate">
                {userProfile?.name || "Admin User"}
              </div>
              <div className="text-[11px] text-gray-400 truncate">
                {userProfile?.email || "admin@aethelflow.com"}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium text-gray-300 hover:text-white bg-white/5 hover:bg-red-500/15 hover:border-red-500/30 border border-transparent transition-all cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}
