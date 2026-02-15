"use client";

interface StatusDotProps {
  status: "online" | "offline" | "checking";
}

export default function StatusDot({ status }: StatusDotProps) {
  if (status === "checking") {
    return (
      <span className="relative flex h-3 w-3">
        <span className="h-3 w-3 rounded-full bg-gray-400 animate-pulse" />
      </span>
    );
  }

  if (status === "online") {
    return (
      <span className="relative flex h-3 w-3">
        <span
          className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"
          style={{ animation: "ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite" }}
        />
        <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500" />
      </span>
    );
  }

  return (
    <span className="relative flex h-3 w-3">
      <span className="h-3 w-3 rounded-full bg-red-500" />
    </span>
  );
}
