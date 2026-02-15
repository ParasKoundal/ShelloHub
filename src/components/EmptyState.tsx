"use client";

import { ServerOff } from "lucide-react";

interface EmptyStateProps {
  onClear: () => void;
}

export default function EmptyState({ onClear }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <ServerOff className="w-12 h-12 dark:text-gray-600 text-gray-300 mb-4" />
      <p className="dark:text-gray-400 text-gray-500 text-lg mb-2">
        No servers match your search
      </p>
      <button
        onClick={onClear}
        className="text-blue-500 hover:text-blue-400 text-sm font-medium"
      >
        Clear filters
      </button>
    </div>
  );
}
