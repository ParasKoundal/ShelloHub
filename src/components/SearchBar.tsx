"use client";

import { Search, X } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative w-full max-w-md">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search servers..."
        className="w-full pl-10 pr-10 py-2 rounded-lg text-sm transition-colors
          dark:bg-white/5 dark:text-gray-200 dark:border-white/10 dark:placeholder-gray-500
          dark:focus:border-blue-500/50 dark:focus:ring-1 dark:focus:ring-blue-500/30
          bg-white text-gray-900 border-gray-200 placeholder-gray-400
          focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30
          border outline-none"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
