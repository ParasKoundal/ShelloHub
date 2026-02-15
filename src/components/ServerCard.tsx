"use client";

import { ExternalLink } from "lucide-react";
import { ServerConfig, ServerStatus } from "@/lib/types";
import { getGroupColor } from "@/lib/colors";
import { useThemeContext } from "@/context/ThemeContext";
import StatusDot from "./StatusDot";
import CopyButton from "./CopyButton";

interface ServerCardProps {
  server: ServerConfig;
  status?: ServerStatus;
}

function timeAgo(isoString: string): string {
  const seconds = Math.floor(
    (Date.now() - new Date(isoString).getTime()) / 1000
  );
  if (seconds < 5) return "just now";
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  return `${hours}h ago`;
}

export default function ServerCard({ server, status }: ServerCardProps) {
  const { theme } = useThemeContext();
  const isDark = theme === "dark";
  const currentStatus = status?.status || "checking";
  const groupColor = getGroupColor(server.group, isDark);

  return (
    <div
      className={`rounded-xl p-5 transition-all duration-200
        ${
          isDark
            ? "bg-[var(--color-surface-card)] border border-[var(--color-surface-border)] hover:border-blue-500/30 hover:bg-[var(--color-surface-hover)]"
            : "bg-white border border-gray-200 hover:border-blue-300 hover:shadow-md"
        }`}
    >
      {/* Header row */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <StatusDot status={currentStatus} />
          <h3
            className={`font-semibold truncate ${
              isDark ? "text-gray-100" : "text-gray-900"
            }`}
          >
            {server.name}
          </h3>
        </div>
        <CopyButton text={server.url} />
      </div>

      {/* Group tag */}
      <div className="mb-3">
        <span
          className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium capitalize ${groupColor}`}
        >
          {server.group}
        </span>
      </div>

      {/* Description */}
      {server.description && (
        <p
          className={`text-sm mb-4 line-clamp-2 ${
            isDark ? "text-gray-400" : "text-gray-500"
          }`}
        >
          {server.description}
        </p>
      )}

      {/* Status info */}
      <div
        className={`flex items-center justify-between text-xs mb-4 ${
          isDark ? "text-gray-500" : "text-gray-400"
        }`}
      >
        {status?.latencyMs != null && <span>{status.latencyMs}ms</span>}
        {status?.lastChecked && <span>{timeAgo(status.lastChecked)}</span>}
        {!status && <span>Checking...</span>}
      </div>

      {/* Open terminal button */}
      <a
        href={server.url}
        target="_blank"
        rel="noopener noreferrer"
        className={`flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-sm font-medium transition-colors
          ${
            currentStatus === "online"
              ? "bg-blue-600 hover:bg-blue-500 text-white"
              : isDark
                ? "bg-white/5 hover:bg-white/10 text-gray-400"
                : "bg-gray-100 hover:bg-gray-200 text-gray-500"
          }`}
      >
        Open Terminal
        <ExternalLink className="w-3.5 h-3.5" />
      </a>
    </div>
  );
}
