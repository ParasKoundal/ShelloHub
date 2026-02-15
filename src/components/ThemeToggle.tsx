"use client";

import { Moon, Sun } from "lucide-react";
import { useThemeContext } from "@/context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme, mounted } = useThemeContext();

  if (!mounted) return <div className="w-9 h-9" />;

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg transition-colors
        dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-white/10
        text-gray-500 hover:text-gray-700 hover:bg-gray-100"
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {theme === "dark" ? (
        <Sun className="w-5 h-5" />
      ) : (
        <Moon className="w-5 h-5" />
      )}
    </button>
  );
}
