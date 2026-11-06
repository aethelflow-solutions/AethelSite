"use client";

import React from "react";
import { MessageSquare, Clock } from "lucide-react";

export default function AdminChatsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">
          Chats
        </h1>
        <span className="text-sm text-gray-500 mt-1 block">
          AI chatbot sessions and visitor conversations.
        </span>
      </div>

      <div className="rounded-3xl bg-white border border-gray-200/80 p-10 text-center shadow-xs">
        <div className="mx-auto w-14 h-14 rounded-2xl bg-[#1B1A1A] text-[#28a2fe] flex items-center justify-center mb-4">
          <MessageSquare className="w-6 h-6" />
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-medium mb-2">
          <Clock className="w-3.5 h-3.5 text-[#28a2fe]" />
          <span>In Development</span>
        </div>
        <h2 className="text-lg font-semibold text-gray-900">
          Chat Sessions Viewer Coming Soon
        </h2>
        <span className="text-xs text-gray-500 max-w-md mx-auto mt-1 block">
          All visitor AI chat sessions and message histories will be displayed here.
        </span>
      </div>
    </div>
  );
}
