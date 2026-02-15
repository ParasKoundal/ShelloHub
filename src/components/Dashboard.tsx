"use client";

import { useState, useMemo } from "react";
import { ServerConfig } from "@/lib/types";
import { useServerStatus } from "@/hooks/useServerStatus";
import Header from "./Header";
import GroupFilter from "./GroupFilter";
import ServerGrid from "./ServerGrid";
import EmptyState from "./EmptyState";

interface DashboardProps {
  initialServers: ServerConfig[];
  groups: string[];
}

export default function Dashboard({ initialServers, groups }: DashboardProps) {
  const [search, setSearch] = useState("");
  const [activeGroup, setActiveGroup] = useState<string | null>(null);
  const { statuses, isLoading, refetch } = useServerStatus();

  const filteredServers = useMemo(() => {
    let filtered = initialServers;

    if (activeGroup) {
      filtered = filtered.filter((s) => s.group === activeGroup);
    }

    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.group.toLowerCase().includes(q) ||
          s.url.toLowerCase().includes(q) ||
          (s.description && s.description.toLowerCase().includes(q))
      );
    }

    return filtered;
  }, [initialServers, search, activeGroup]);

  const onlineCount = useMemo(() => {
    let count = 0;
    statuses.forEach((s) => {
      if (s.status === "online") count++;
    });
    return count;
  }, [statuses]);

  const clearFilters = () => {
    setSearch("");
    setActiveGroup(null);
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Header
          search={search}
          onSearchChange={setSearch}
          onlineCount={onlineCount}
          totalCount={initialServers.length}
          onRefresh={refetch}
          isLoading={isLoading}
        />

        {groups.length > 1 && (
          <div className="mb-6">
            <GroupFilter
              groups={groups}
              activeGroup={activeGroup}
              onSelect={setActiveGroup}
            />
          </div>
        )}

        {filteredServers.length > 0 ? (
          <ServerGrid servers={filteredServers} statuses={statuses} />
        ) : (
          <EmptyState onClear={clearFilters} />
        )}
      </div>
    </div>
  );
}
