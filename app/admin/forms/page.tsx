"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  FileText,
  Mail,
  Phone,
  Building2,
  Calendar,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  Eye,
  X,
  Tag,
  MessageSquareText,
  User,
} from "lucide-react";
import { fetchFormsListApi } from "@/_api/admin-form.api";
import { Form } from "@/types/admin-form.type";
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

export default function AdminFormsPage() {
  const [forms, setForms] = useState<Form[]>([]);
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
  const [selectedForm, setSelectedForm] = useState<Form | null>(null);

  const loadForms = useCallback(
    async (currentPage: number, currentLimit: number) => {
      setIsLoading(true);
      try {
        const [status, response] = await fetchFormsListApi({
          page: currentPage,
          limit: currentLimit,
        });

        if (status && response?.success && response?.data) {
          setForms(response.data.forms || []);
          if (response.data.pagination) {
            setPagination(response.data.pagination);
          }
        } else {
          setForms([]);
        }
      } catch (error) {
        console.error("Failed to fetch forms list:", error);
        setForms([]);
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  useEffect(() => {
    loadForms(page, limit);
  }, [page, limit, loadForms]);

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

  // Build visible page numbers
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
            Form Submissions
          </h1>
          <span className="text-sm text-gray-500 mt-1 block">
            View and manage customer inquiries submitted through the website.
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
            onClick={() => loadForms(page, limit)}
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
                className="h-16 rounded-2xl bg-gray-100 animate-pulse"
              />
            ))}
          </div>
        ) : forms.length === 0 ? (
          <div className="p-12 text-center">
            <div className="mx-auto w-14 h-14 rounded-2xl bg-[#1B1A1A] text-[#28a2fe] flex items-center justify-center mb-4">
              <FileText className="w-6 h-6" />
            </div>
            <h2 className="text-base font-semibold text-gray-900">
              No form submissions found
            </h2>
            <span className="text-xs text-gray-500 mt-1 block">
              New inquiries submitted on the website will appear here.
            </span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-200/80 bg-gray-50/80 text-[11px] font-semibold uppercase tracking-wider text-gray-500">
                  <th className="py-3.5 px-5">Contact</th>
                  <th className="py-3.5 px-4">Company</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Message</th>
                  <th className="py-3.5 px-4">Date</th>
                  <th className="py-3.5 px-5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {forms.map((item) => (
                  <tr
                    key={item._id}
                    className="hover:bg-gray-50/70 transition-colors"
                  >
                    {/* Contact */}
                    <td className="py-4 px-5 align-top">
                      <div className="font-semibold text-gray-900">
                        {item.name || "—"}
                      </div>
                      <div className="flex flex-col gap-0.5 mt-1 text-xs text-gray-500">
                        {item.email && (
                          <a
                            href={`mailto:${item.email}`}
                            className="inline-flex items-center gap-1.5 hover:text-[#28a2fe] transition-colors"
                          >
                            <Mail className="w-3 h-3 shrink-0" />
                            <span className="truncate max-w-[200px]">
                              {item.email}
                            </span>
                          </a>
                        )}
                        {item.phoneNumber && (
                          <a
                            href={`tel:${item.phoneNumber}`}
                            className="inline-flex items-center gap-1.5 hover:text-[#28a2fe] transition-colors"
                          >
                            <Phone className="w-3 h-3 shrink-0" />
                            <span>{item.phoneNumber}</span>
                          </a>
                        )}
                      </div>
                    </td>

                    {/* Company */}
                    <td className="py-4 px-4 align-top text-xs text-gray-700">
                      <div className="inline-flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                        <span>{item.companyName || "N/A"}</span>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-4 px-4 align-top">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-[#1B1A1A] text-[#7dd3fc]">
                        {item.category || "General"}
                      </span>
                    </td>

                    {/* Message */}
                    <td className="py-4 px-4 align-top max-w-xs">
                      <div className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                        {item.message || "—"}
                      </div>
                    </td>

                    {/* Date */}
                    <td className="py-4 px-4 align-top whitespace-nowrap text-xs text-gray-500">
                      <div className="inline-flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                        <span>{formatDate(item.createdAt)}</span>
                      </div>
                    </td>

                    {/* Action */}
                    <td className="py-4 px-5 align-top text-right">
                      <button
                        type="button"
                        onClick={() => setSelectedForm(item)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-gray-100 hover:bg-[#1B1A1A] text-gray-700 hover:text-white transition-colors cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View</span>
                      </button>
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
            entries
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

      {/* Form Details Modal */}
      {selectedForm && (
        <div
          onClick={() => setSelectedForm(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg rounded-3xl bg-white shadow-2xl border border-gray-200 overflow-hidden"
          >
            <div
              className="flex items-center justify-between px-6 py-4 text-white"
              style={{
                background: "linear-gradient(180deg, #05060a 0%, #1B1A1A 100%)",
              }}
            >
              <div className="flex items-center gap-2.5">
                <FileText className="w-4 h-4 text-[#28a2fe]" />
                <h3 className="text-sm font-semibold">Submission Details</h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedForm(null)}
                className="p-1.5 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-100">
                  <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-1">
                    <User className="w-3.5 h-3.5" />
                    <span>Name</span>
                  </div>
                  <div className="font-semibold text-gray-900">
                    {selectedForm.name || "—"}
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-100">
                  <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-1">
                    <Building2 className="w-3.5 h-3.5" />
                    <span>Company</span>
                  </div>
                  <div className="font-semibold text-gray-900">
                    {selectedForm.companyName || "N/A"}
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-100">
                  <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-1">
                    <Mail className="w-3.5 h-3.5" />
                    <span>Email</span>
                  </div>
                  <a
                    href={`mailto:${selectedForm.email}`}
                    className="font-medium text-[#28a2fe] hover:underline break-all"
                  >
                    {selectedForm.email || "—"}
                  </a>
                </div>

                <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-100">
                  <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-1">
                    <Phone className="w-3.5 h-3.5" />
                    <span>Phone</span>
                  </div>
                  <a
                    href={`tel:${selectedForm.phoneNumber}`}
                    className="font-medium text-gray-900 hover:text-[#28a2fe]"
                  >
                    {selectedForm.phoneNumber || "—"}
                  </a>
                </div>
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-gray-50 border border-gray-100">
                <div className="flex items-center gap-2">
                  <Tag className="w-3.5 h-3.5 text-gray-400" />
                  <span className="text-xs text-gray-500">Category:</span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#1B1A1A] text-[#7dd3fc]">
                    {selectedForm.category || "General"}
                  </span>
                </div>
                <span className="text-xs text-gray-400">
                  {formatDate(selectedForm.createdAt)}
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-2">
                  <MessageSquareText className="w-3.5 h-3.5" />
                  <span>Message</span>
                </div>
                <div className="text-xs sm:text-sm text-gray-800 whitespace-pre-wrap leading-relaxed">
                  {selectedForm.message || "—"}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
