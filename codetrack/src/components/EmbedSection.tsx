"use client";

import "@/app/globals.css";
import { useState } from "react";
import { themes } from "@/utils/themes";

export default function EmbedSection({ username }: { username: string }) {
  const [copiedType, setCopiedType] = useState<"script" | "iframe" | null>(
    null
  );
  const [activeTab, setActiveTab] = useState<"script" | "iframe">("iframe");

  const handleCopy = (type: "script" | "iframe", code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  const scriptCode = `<github-heatmap username="${username}" scale="1"></github-heatmap>\n<script src="${process.env.NEXT_PUBLIC_APP_URL}/github-widget" defer></script>`;
  const iframeCode = `<iframe src="${process.env.NEXT_PUBLIC_APP_URL}/embed/${username}" frameborder="0" width="800px" style="transform:scale(1); transform-origin:top left;border-radius:1rem"></iframe>`;

  return (
    <article className="h-fit rounded-lg p-6 bg-white dark:bg-gray-800 border border-blue-500/20">
      <div className="flex justify-center items-center bg-primary py-2 rounded-md">
        <svg
          className="w-4 h-4 mr-2 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
          />
        </svg>
        <h3 className="text-center font-bold">
          Embed Graph on Your Website
        </h3>
      </div>

      <div className="mt-4">
        <div className="flex p-1 space-x-1 bg-gray-800 rounded-lg">
          <button
            onClick={() => setActiveTab("iframe")}
            className={`flex-1 flex items-center justify-center px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${activeTab === "iframe"
                ? "bg-primary/80 text-white shadow-lg"
                : "text-gray-400 hover:text-gray-200 hover:bg-gray-700"
              }`}
          >
            <svg
              className={`w-4 h-4 mr-2 ${activeTab === "iframe"
                  ? "text-white"
                  : "text-gray-400"
                }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
            iframe
          </button>
          <button
            onClick={() => setActiveTab("script")}
            className={`flex-1 flex items-center justify-center px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${activeTab === "script"
                ? "bg-blue-500 text-white shadow-lg"
                : "text-gray-400 hover:text-gray-200 hover:bg-gray-700"
              }`}
          >
            <svg
              className={`w-4 h-4 mr-2 ${activeTab === "script"
                  ? "text-white"
                  : "text-gray-400"
                }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
              />
            </svg>
            Script
          </button>
        </div>

        <div className="mt-4">
          <div className="relative group">
            <pre className="bg-gray-700 border border-gray-700 p-6 rounded-md text-sm text-gray-200 w-full overflow-x-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800">
              <code className="whitespace-pre inline-block min-w-full pr-12">
                {activeTab === "script"
                  ? scriptCode
                  : iframeCode}
              </code>
            </pre>
            <button
              onClick={() =>
                handleCopy(
                  activeTab,
                  activeTab === "script"
                    ? scriptCode
                    : iframeCode
                )
              }
              className="absolute top-2 right-2 p-2 bg-blue-500 rounded-md transition-all hover:bg-blue-600"
            >
              {copiedType === activeTab ? (
                <svg
                  className="w-5 h-5 text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5 text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
