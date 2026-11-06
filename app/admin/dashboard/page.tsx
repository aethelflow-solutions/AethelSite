"use client";

import React from "react";
import Link from "next/link";
import {
  Wrench,
  Sparkles,
  FileText,
  MessageSquare,
  ArrowUpRight,
  Clock,
} from "lucide-react";
import { useProfileHook } from "@/hooks/useProfileHook";

export default function AdminDashboardPage() {
  const { userProfile } = useProfileHook();

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#1B1A1A] text-[#7dd3fc] mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#28a2fe]" />
            Overview
          </span>
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">
            Welcome back{userProfile?.name ? `, ${userProfile.name}` : ""}
          </h1>
          <span className="text-sm text-gray-500 mt-1 block">
            Manage Aethel Flow inquiries, form submissions, and AI chat sessions.
          </span>
        </div>
      </div>

      {/* Main "Under Development" Message Card */}
      <div
        className="relative overflow-hidden rounded-3xl p-8 sm:p-10 text-white shadow-xl border border-white/10"
        style={{
          background: "linear-gradient(135deg, #05060a 0%, #1B1A1A 100%)",
        }}
      >
        {/* Ambient Glow */}
        <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-[#28a2fe]/15 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-[#28a2fe]/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#28a2fe]/15 border border-[#28a2fe]/30 text-[#7dd3fc] text-xs font-semibold">
              <Clock className="w-3.5 h-3.5 text-[#28a2fe]" />
              <span>In Development</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-semibold text-white">
              Dashboard Analytics &amp; Insights are Under Development
            </h2>

            <div className="text-sm sm:text-base text-gray-300 leading-relaxed">
              We are actively building real-time metrics, conversation analytics,
              and automated workflow controls for this dashboard. In the
              meantime, you can navigate to{" "}
              <strong className="text-white">Forms</strong> and{" "}
              <strong className="text-white">Chats</strong> from the sidebar.
            </div>
          </div>

          <div className="shrink-0 flex items-center justify-center w-20 h-20 rounded-3xl bg-white/5 border border-white/15 text-[#28a2fe] shadow-inner">
            <Wrench className="w-9 h-9" />
          </div>
        </div>
      </div>

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          href="/admin/forms"
          className="group flex items-start justify-between p-6 rounded-3xl bg-white border border-gray-200/80 shadow-xs hover:border-[#1B1A1A] hover:shadow-md transition-all"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#1B1A1A] text-[#28a2fe] flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-gray-900">
                Form Submissions
              </h3>
              <span className="text-xs text-gray-500 mt-1 block leading-relaxed">
                View and manage customer inquiries submitted through the website
                contact forms.
              </span>
            </div>
          </div>
          <ArrowUpRight className="w-5 h-5 text-gray-400 group-hover:text-gray-900 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
        </Link>

        <Link
          href="/admin/chats"
          className="group flex items-start justify-between p-6 rounded-3xl bg-white border border-gray-200/80 shadow-xs hover:border-[#1B1A1A] hover:shadow-md transition-all"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#1B1A1A] text-[#28a2fe] flex items-center justify-center shrink-0">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-gray-900">
                AI Chat Sessions
              </h3>
              <span className="text-xs text-gray-500 mt-1 block leading-relaxed">
                Inspect visitor conversations, AI responses, and token usage
                across sessions.
              </span>
            </div>
          </div>
          <ArrowUpRight className="w-5 h-5 text-gray-400 group-hover:text-gray-900 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
        </Link>
      </div>
    </div>
  );
}
