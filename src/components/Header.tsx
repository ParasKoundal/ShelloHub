"use client";

import { Terminal, RefreshCw } from "lucide-react";
import { useThemeContext } from "@/context/ThemeContext";
import SearchBar from "./SearchBar";
import ThemeToggle from "./ThemeToggle";

interface HeaderProps {
  search: string;
  onSearchChange: (value: string) => void;
  onlineCount: number;
  totalCount: number;
  onRefresh: () => void;
  isLoading: boolean;
}

export default function Header({
  search,
  onSearchChange,
  onlineCount,
  totalCount,
  onRefresh,
  isLoading,
}: HeaderProps) {
  const { theme } = useThemeContext();
  const isDark = theme === "dark";

  return (
    <header className="mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-600/10 border border-blue-600/20">
            <Terminal className="w-6 h-6 text-blue-500" />
          </div>
          <div>
            <h1
              className={`text-xl font-bold ${
                isDark ? "text-gray-100" : "text-gray-900"
              }`}
            >
              Shello Hub
            </h1>
            <p
              className={`text-sm ${
                isDark ? "text-gray-500" : "text-gray-400"
              }`}
            >
              <span className="text-green-500 font-medium">{onlineCount}</span>
              {" / "}
              {totalCount} servers online
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={onRefresh}
            disabled={isLoading}
            className={`p-2 rounded-lg transition-colors
              ${isDark
                ? "text-gray-400 hover:text-gray-200 hover:bg-white/10"
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
              }
              disabled:opacity-50`}
            title="Refresh status"
          >
            <RefreshCw
              className={`w-5 h-5 ${isLoading ? "animate-spin" : ""}`}
            />
          </button>
          <ThemeToggle />
        </div>
      </div>

      {/* Search */}
      <SearchBar value={search} onChange={onSearchChange} />
    </header>
  );
}
