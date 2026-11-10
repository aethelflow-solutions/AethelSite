"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Menu } from "lucide-react";
import { getAccessToken } from "@/helpers/localStorage.helper";
import AdminSidebar from "./AdminSidebar";

interface AdminShellProps {
  children: React.ReactNode;
}

export default function AdminShell({ children }: AdminShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    if (pathname === "/admin/login") {
      setIsAuthorized(true);
      return;
    }

    const token = getAccessToken();
    if (!token) {
      setIsAuthorized(false);
      router.replace("/admin/login");
    } else {
      setIsAuthorized(true);
    }
  }, [pathname, router]);

  // Do not show sidebar on login page
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  // Prevent rendering protected admin pages when there is no token
  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#05060a] text-white">
        <div className="w-8 h-8 rounded-full border-2 border-[#28a2fe] border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-[#f8fafc] text-gray-900">
      <AdminSidebar
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Top Bar */}
        <header className="lg:hidden sticky top-0 z-30 flex items-center justify-between px-4 py-3.5 bg-[#0d0d11] text-white border-b border-white/10">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation menu"
              className="p-2 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <Menu className="w-5 h-5" />
            </button>
            <span className="font-semibold text-sm tracking-wide">
              AETHEL <span className="italic text-[#7dd3fc]">FLOW</span> ADMIN
            </span>
          </div>
        </header>

        <main className="flex-1 p-5 sm:p-8 lg:p-10 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
