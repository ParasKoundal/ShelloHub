"use client";

import { useState, useEffect, useCallback } from "react";
import { ServerStatus } from "@/lib/types";

export function useServerStatus() {
  const [statuses, setStatuses] = useState<Map<string, ServerStatus>>(
    new Map()
  );
  const [isLoading, setIsLoading] = useState(true);

  const fetchStatuses = useCallback(async () => {
    try {
      const res = await fetch("/api/servers/status");
      const data = await res.json();
      const map = new Map<string, ServerStatus>();
      data.statuses.forEach((s: ServerStatus) => map.set(s.id, s));
      setStatuses(map);
    } catch (err) {
      console.error("Failed to fetch server statuses:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStatuses();
    const interval = setInterval(fetchStatuses, 30_000);
    return () => clearInterval(interval);
  }, [fetchStatuses]);

  return { statuses, isLoading, refetch: fetchStatuses };
}
