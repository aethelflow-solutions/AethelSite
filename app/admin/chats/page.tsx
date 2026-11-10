"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  MessageSquare,
  Calendar,
  Monitor,
  Smartphone,
  Tablet,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  ArrowUpRight,
} from "lucide-react";
import { fetchChatSessionsListApi } from "@/_api/admin-chat.api";
import { AdminChatSessionItem } from "@/types/admin-chat.type";
import { DeviceType } from "@/types/chat.type";
import { Pagination } from "@/types/index.type";

const LIMIT_OPTIONS = [5, 10, 20, 50];

function formatDate(dateStr?: string): string {
  if (!dateStr) return "—";
  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return "—";
    return date.toLocaleString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  } catch {
    return "—";
  }
}

function getDeviceIcon(deviceType?: DeviceType) {
  switch (deviceType) {
    case "mobile":
      return <Smartphone className="w-3.5 h-3.5 text-[#28a2fe]" />;
    case "tablet":
      return <Tablet className="w-3.5 h-3.5 text-[#28a2fe]" />;
    case "desktop":
      return <Monitor className="w-3.5 h-3.5 text-[#28a2fe]" />;
    default:
      return <HelpCircle className="w-3.5 h-3.5 text-gray-400" />;
  }
}

export default function AdminChatsPage() {
  const router = useRouter();
  const [sessions, setSessions] = useState<AdminChatSessionItem[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    totalDocs: 0,
    totalPages: 1,
    currentPage: 1,
    limit: 10,
    hasNextPage: false,
    hasPreviousPage: false,
  });
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const loadSessions = useCallback(
    async (currentPage: number, currentLimit: number) => {
      setIsLoading(true);
      try {
        const [status, response] = await fetchChatSessionsListApi({
          page: currentPage,
          limit: currentLimit,
        });

        if (status && response?.success && response?.data) {
          setSessions(response.data.sessionsList || []);
          if (response.data.pagination) {
            setPagination(response.data.pagination);
          }
        } else {
          setSessions([]);
        }
      } catch (error) {
        console.error("Failed to fetch chat sessions list:", error);
        setSessions([]);
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  useEffect(() => {
    loadSessions(page, limit);
  }, [page, limit, loadSessions]);

  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const nextLimit = Number(e.target.value);
    setLimit(nextLimit);
    setPage(1);
  };

  const handlePageChange = (nextPage: number) => {
    if (nextPage < 1 || nextPage > pagination.totalPages) return;
    setPage(nextPage);
  };

  const startEntry =
    pagination.totalDocs === 0
      ? 0
      : (pagination.currentPage - 1) * pagination.limit + 1;
  const endEntry = Math.min(
    pagination.currentPage * pagination.limit,
    pagination.totalDocs,
  );

  const getPageNumbers = (): number[] => {
    const total = Math.max(1, pagination.totalPages);
    const current = pagination.currentPage;
    const pages: number[] = [];
    const start = Math.max(1, current - 2);
    const end = Math.min(total, start + 4);
    for (let i = Math.max(1, end - 4); i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">
            Chat Sessions
          </h1>
          <span className="text-sm text-gray-500 mt-1 block">
            Click on any session to inspect the full conversation.
          </span>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-auto">
          {/* Limit Selector */}
          <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-700 shadow-2xs">
            <span className="text-gray-500 font-medium">Show:</span>
            <select
              value={limit}
              onChange={handleLimitChange}
              aria-label="Items per page"
              className="bg-transparent font-semibold text-gray-900 focus:outline-none cursor-pointer"
            >
              {LIMIT_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt} / page
                </option>
              ))}
            </select>
          </div>

          {/* Refresh Button */}
          <button
            type="button"
            onClick={() => loadSessions(page, limit)}
            disabled={isLoading}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#1B1A1A] hover:bg-black text-white text-xs font-medium transition-all disabled:opacity-50 cursor-pointer shadow-2xs"
          >
            <RefreshCw
              className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`}
            />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Table Card */}
      <div className="rounded-3xl bg-white border border-gray-200/80 shadow-xs overflow-hidden">
        {isLoading ? (
          <div className="p-8 space-y-4">
            {Array.from({ length: 5 }).map((_, idx) => (
              <div
                key={idx}
                className="h-14 rounded-2xl bg-gray-100 animate-pulse"
              />
            ))}
          </div>
        ) : sessions.length === 0 ? (
          <div className="p-12 text-center">
            <div className="mx-auto w-14 h-14 rounded-2xl bg-[#1B1A1A] text-[#28a2fe] flex items-center justify-center mb-4">
              <MessageSquare className="w-6 h-6" />
            </div>
            <h2 className="text-base font-semibold text-gray-900">
              No chat sessions found
            </h2>
            <span className="text-xs text-gray-500 mt-1 block">
              Visitor conversations with the AI chatbot will appear here.
            </span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-200/80 bg-gray-50/80 text-[11px] font-semibold uppercase tracking-wider text-gray-500">
                  <th className="py-3.5 px-5">Title</th>
                  <th className="py-3.5 px-4">Session ID</th>
                  <th className="py-3.5 px-4">Messages</th>
                  <th className="py-3.5 px-4">Device</th>
                  <th className="py-3.5 px-4">Session Date</th>
                  <th className="py-3.5 px-5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {sessions.map((item) => (
                  <tr
                    key={item._id}
                    onClick={() => router.push(`/admin/chats/${item._id}`)}
                    className="group hover:bg-gray-50/90 transition-colors cursor-pointer"
                  >
                    {/* Title */}
                    <td className="py-4 px-5 align-middle">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-[#1B1A1A] text-[#28a2fe] flex items-center justify-center shrink-0">
                          <MessageSquare className="w-4 h-4" />
                        </div>
                        <span className="font-semibold text-gray-900 group-hover:text-[#28a2fe] transition-colors">
                          {item.title || "Untitled Chat"}
                        </span>
                      </div>
                    </td>

                    {/* Session ID */}
                    <td className="py-4 px-4 align-middle">
                      <code className="px-2.5 py-1 rounded-lg bg-gray-100 text-gray-600 text-xs font-mono">
                        {item._id}
                      </code>
                    </td>

                    {/* Messages Count */}
                    <td className="py-4 px-4 align-middle">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-sky-50 text-[#28a2fe] border border-sky-200/70">
                        <MessageSquare className="w-3 h-3" />
                        <span>{item.messagesCount ?? 0}</span>
                      </span>
                    </td>

                    {/* Device Type */}
                    <td className="py-4 px-4 align-middle">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-[#1B1A1A] text-white capitalize">
                        {getDeviceIcon(item.deviceType)}
                        <span>{item.deviceType || "unknown"}</span>
                      </span>
                    </td>

                    {/* Date */}
                    <td className="py-4 px-4 align-middle whitespace-nowrap text-xs text-gray-600">
                      <div className="inline-flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                        <span>{formatDate(item.date)}</span>
                      </div>
                    </td>

                    {/* Open Action */}
                    <td className="py-4 px-5 align-middle text-right">
                      <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-medium bg-gray-100 group-hover:bg-[#1B1A1A] text-gray-700 group-hover:text-white transition-colors">
                        <span>Open</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Footer */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-5 py-4 bg-gray-50/70 border-t border-gray-200/80">
          <div className="text-xs text-gray-500">
            Showing{" "}
            <span className="font-semibold text-gray-900">{startEntry}</span> to{" "}
            <span className="font-semibold text-gray-900">{endEntry}</span> of{" "}
            <span className="font-semibold text-gray-900">
              {pagination.totalDocs}
            </span>{" "}
            sessions
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              disabled={!pagination.hasPreviousPage || isLoading}
              onClick={() => handlePageChange(page - 1)}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-medium bg-white border border-gray-200 text-gray-700 hover:bg-gray-100 disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Prev</span>
            </button>

            {getPageNumbers().map((pageNum) => {
              const isActive = pageNum === pagination.currentPage;
              return (
                <button
                  key={pageNum}
                  type="button"
                  disabled={isLoading}
                  onClick={() => handlePageChange(pageNum)}
                  className={`w-8 h-8 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                    isActive
                      ? "bg-[#1B1A1A] text-white shadow-2xs"
                      : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              type="button"
              disabled={!pagination.hasNextPage || isLoading}
              onClick={() => handlePageChange(page + 1)}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-medium bg-white border border-gray-200 text-gray-700 hover:bg-gray-100 disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer"
            >
              <span>Next</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
