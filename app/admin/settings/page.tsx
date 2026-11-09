"use client";

import React, { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import {
  Bot,
  Cpu,
  Sparkles,
  Plus,
  Trash2,
  Save,
  RefreshCw,
  Clock,
} from "lucide-react";
import {
  fetchAdminSettingsApi,
  updateAdminSettingsApi,
} from "@/_api/admin-settings.api";

function formatDateTime(dateStr?: string): string {
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

export default function AdminSettingsPage() {
  const [isBotActive, setIsBotActive] = useState<boolean>(true);
  const [maxTokenUsage, setMaxTokenUsage] = useState<number>(20000);
  const [initialQuestions, setInitialQuestions] = useState<string[]>([]);
  const [newQuestion, setNewQuestion] = useState<string>("");
  const [updatedAt, setUpdatedAt] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const loadSettings = useCallback(async () => {
    setIsLoading(true);
    try {
      const [status, response] = await fetchAdminSettingsApi();
      if (status && response?.success && response?.data) {
        const data = response.data;
        setIsBotActive(Boolean(data.isBotActive));
        setMaxTokenUsage(Number(data.max_token_usage ?? 20000));
        setInitialQuestions(
          Array.isArray(data.initialQuestions) ? data.initialQuestions : [],
        );
        setUpdatedAt(data.updatedAt || data.createdAt || "");
      }
    } catch (error) {
      console.error("Failed to fetch admin settings:", error);
      toast.error("Failed to load settings");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSettings();
  }, [loadSettings]);

  const handleQuestionChange = (index: number, value: string) => {
    setInitialQuestions((prev) =>
      prev.map((q, idx) => (idx === index ? value : q)),
    );
  };

  const handleRemoveQuestion = (index: number) => {
    setInitialQuestions((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleAddQuestion = () => {
    const trimmed = newQuestion.trim();
    if (!trimmed) return;
    setInitialQuestions((prev) => [...prev, trimmed]);
    setNewQuestion("");
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanedQuestions = initialQuestions
      .map((q) => q.trim())
      .filter(Boolean);

    setIsSaving(true);
    try {
      const [status, response] = await updateAdminSettingsApi({
        isBotActive,
        max_token_usage: Number(maxTokenUsage) || 0,
        initialQuestions: cleanedQuestions,
      });

      if (status && response?.success) {
        if (response.data) {
          setIsBotActive(Boolean(response.data.isBotActive));
          setMaxTokenUsage(Number(response.data.max_token_usage ?? 20000));
          setInitialQuestions(
            Array.isArray(response.data.initialQuestions)
              ? response.data.initialQuestions
              : cleanedQuestions,
          );
          setUpdatedAt(response.data.updatedAt || new Date().toISOString());
        } else {
          setInitialQuestions(cleanedQuestions);
        }
        toast.success(response.message || "Settings updated successfully");
      } else {
        toast.error(response?.message || "Failed to update settings");
      }
    } catch (error) {
      console.error("Failed to update admin settings:", error);
      toast.error("Something went wrong while saving settings");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">
            Chatbot Settings
          </h1>
          <span className="text-sm text-gray-500 mt-1 block">
            Configure AI chatbot visibility, token limits, and initial suggested
            questions.
          </span>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-auto">
          {updatedAt && (
            <span className="hidden md:inline-flex items-center gap-1.5 text-xs text-gray-400">
              <Clock className="w-3.5 h-3.5 text-[#28a2fe]" />
              Updated: {formatDateTime(updatedAt)}
            </span>
          )}

          <button
            type="button"
            onClick={loadSettings}
            disabled={isLoading || isSaving}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs font-medium transition-all disabled:opacity-50 cursor-pointer shadow-2xs"
          >
            <RefreshCw
              className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`}
            />
            <span>Reload</span>
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          <div className="h-28 rounded-3xl bg-white border border-gray-200/80 animate-pulse" />
          <div className="h-32 rounded-3xl bg-white border border-gray-200/80 animate-pulse" />
          <div className="h-64 rounded-3xl bg-white border border-gray-200/80 animate-pulse" />
        </div>
      ) : (
        <form onSubmit={handleSave} className="space-y-6">
          {/* Bot Status Toggle Card */}
          <div className="rounded-3xl bg-white border border-gray-200/80 p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#1B1A1A] text-[#28a2fe] flex items-center justify-center shrink-0">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-semibold text-gray-900">
                    Chatbot Active Status
                  </h2>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                      isBotActive
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : "bg-gray-100 text-gray-600 border border-gray-200"
                    }`}
                  >
                    {isBotActive ? "Active" : "Inactive"}
                  </span>
                </div>
                <span className="text-xs text-gray-500 mt-1 block">
                  When enabled, the floating AI chatbot icon is visible to
                  visitors on the website.
                </span>
              </div>
            </div>

            <button
              type="button"
              role="switch"
              aria-checked={isBotActive}
              onClick={() => setIsBotActive((prev) => !prev)}
              className={`relative inline-flex h-7 w-13 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                isBotActive ? "bg-[#28a2fe]" : "bg-gray-300"
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-md transition duration-200 ease-in-out ${
                  isBotActive ? "translate-x-6" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          {/* Max Token Usage Card */}
          <div className="rounded-3xl bg-white border border-gray-200/80 p-6 shadow-xs space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#1B1A1A] text-[#7dd3fc] flex items-center justify-center shrink-0">
                <Cpu className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <label
                  htmlFor="max_token_usage"
                  className="block text-base font-semibold text-gray-900"
                >
                  Max Token Usage Limit
                </label>
                <span className="text-xs text-gray-500 mt-0.5 block">
                  Maximum token budget allowed for AI chat responses.
                </span>
              </div>
            </div>

            <div className="sm:pl-16">
              <input
                id="max_token_usage"
                type="number"
                min={0}
                step={100}
                value={maxTokenUsage}
                onChange={(e) => setMaxTokenUsage(Number(e.target.value))}
                style={{ outline: "none", boxShadow: "none" }}
                className="w-full sm:w-64 px-4 py-2.5 rounded-2xl bg-gray-50 border border-gray-200 focus:border-[#1B1A1A] focus:bg-white text-sm font-semibold text-gray-900 transition-colors"
              />
            </div>
          </div>

          {/* Initial Questions Card */}
          <div className="rounded-3xl bg-white border border-gray-200/80 p-6 shadow-xs space-y-5">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#1B1A1A] text-[#28a2fe] flex items-center justify-center shrink-0">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-base font-semibold text-gray-900">
                  Initial Suggested Questions
                </h2>
                <span className="text-xs text-gray-500 mt-0.5 block">
                  Quick-reply prompts displayed to visitors before they send
                  their first message.
                </span>
              </div>
            </div>

            {/* Existing Questions List */}
            <div className="space-y-2.5 sm:pl-16">
              {initialQuestions.length === 0 ? (
                <div className="p-4 rounded-2xl bg-gray-50 border border-dashed border-gray-200 text-xs text-gray-400 text-center">
                  No initial questions configured. Add one below.
                </div>
              ) : (
                initialQuestions.map((question, idx) => (
                  <div key={idx} className="flex items-center gap-2.5">
                    <span className="w-6 text-xs font-semibold text-gray-400 text-center shrink-0">
                      {idx + 1}.
                    </span>
                    <input
                      type="text"
                      value={question}
                      onChange={(e) =>
                        handleQuestionChange(idx, e.target.value)
                      }
                      placeholder="Enter suggested question..."
                      style={{ outline: "none", boxShadow: "none" }}
                      className="flex-1 px-4 py-2.5 rounded-2xl bg-gray-50 border border-gray-200 focus:border-[#1B1A1A] focus:bg-white text-sm text-gray-800 transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveQuestion(idx)}
                      title="Remove question"
                      aria-label="Remove question"
                      className="p-2.5 rounded-xl text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}

              {/* Add New Question Input */}
              <div className="flex items-center gap-2.5 pt-2">
                <span className="w-6 shrink-0" />
                <input
                  type="text"
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddQuestion();
                    }
                  }}
                  placeholder="Add a new initial question..."
                  style={{ outline: "none", boxShadow: "none" }}
                  className="flex-1 px-4 py-2.5 rounded-2xl bg-white border border-dashed border-gray-300 focus:border-[#1B1A1A] text-sm text-gray-800 placeholder-gray-400 transition-colors"
                />
                <button
                  type="button"
                  onClick={handleAddQuestion}
                  disabled={!newQuestion.trim()}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-gray-100 hover:bg-[#1B1A1A] text-gray-800 hover:text-white text-xs font-semibold transition-colors disabled:opacity-40 disabled:pointer-events-none cursor-pointer shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add</span>
                </button>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex items-center justify-end">
            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1B1A1A] hover:bg-black text-white text-sm font-semibold shadow-md transition-all disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
            >
              <Save className="w-4 h-4 text-[#28a2fe]" />
              <span>{isSaving ? "Saving Changes..." : "Save Settings"}</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
